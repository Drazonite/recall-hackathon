import type { Room } from "@elizaos/core";
import {
  ChannelType,
  type Content,
  type IAgentRuntime,
  type Memory,
  ModelType,
  Service,
  composePromptFromState,
  elizaLogger,
  logger,
  parseJSONObjectFromText,
} from "@elizaos/core";
import { RecallClient } from "src/clients/recallClient";
import {
  TRADE_ENTITY,
  TRADE_ROOM,
  TRADE_SERVER,
  TRADE_WORLD,
} from "src/constants";
import { recallProvider } from "src/providers/recall";
import { tradeTemplate, exchangeTemplate } from "src/templates";
import { TradeData } from "src/types";

const REBALANCING_INTERVAL = process.env.REBALANCING_INTERVAL || "60";

export class BotService extends Service {
  static serviceType = "manage";
  capabilityDescription =
    "This agent is able to manage the portfolio of the user by trading crypto assets.";
  interval: NodeJS.Timeout;
  // Will run every 1 minute
  // Call an action
  // Buy/Trade
  // Exit

  constructor(runtime: IAgentRuntime) {
    super(runtime);
  }

  static async start(runtime: IAgentRuntime) {
    logger.info("*** Starting Trading service ***");

    const service = new BotService(runtime);
    service.startPerformActionEvaluateLoop();
    await service.performActionEvaluateLoop();

    return service;
  }

  private startPerformActionEvaluateLoop() {
    logger.info("Starting Trading Action now...");

    this.interval = setInterval(
      async () => {
        this.performActionEvaluateLoop();
        return true;
      },
      parseInt(REBALANCING_INTERVAL) * 1000,
    );
  }

  async performActionEvaluateLoop() {
    let room = await this.runtime.getRoom(TRADE_ROOM);
    if (!room) {
      logger.info(`Room ${TRADE_ROOM} not found, creating it...`);
      room = {
        id: TRADE_ROOM,
        name: "TRADE Room",
        worldId: await this.runtime.createWorld({
          id: TRADE_WORLD,
          agentId: this.runtime.agentId,
          name: "TRADE World",
          serverId: TRADE_SERVER,
        }),
        source: "TRADE Service",
        type: ChannelType.SELF,
      } as Room;
      this.runtime.createRoom(room);
    }

    const message: Memory = {
      agentId: this.runtime.agentId,
      entityId: TRADE_ENTITY,
      roomId: TRADE_ROOM,
      content: {},
    };

    const state = await this.runtime.composeState(
      message,
      [recallProvider.name, "RECENT_MESSAGES"],
      true,
    );

    const prompt = composePromptFromState({
      state,
      template: tradeTemplate,
    });

    const llmResponse = await this.runtime.useModel(ModelType.TEXT_LARGE, {
      prompt,
    });

    const { swapInstructions, reasons, targetAllocation } = parseJSONObjectFromText(
      llmResponse,
    ) as {
      swapInstructions: string[];
      reasons: string[];
      targetAllocation: string;
    };

    elizaLogger.info("SWAP INSTRUCTIONS:", swapInstructions);
    elizaLogger.info("REASONS:", reasons);
    elizaLogger.info("TARGET ALLOCATION:", targetAllocation);

    for (const instruction of swapInstructions) {
      const recallClient = new RecallClient(process.env.RECALL_API_KEY);

      const prompt = composePromptFromState({
        state: {
          ...state,
          instruction,
        },
        template: exchangeTemplate,
      });

      const llmResponse = await this.runtime.useModel(ModelType.TEXT_LARGE, {
        prompt,
      });

      console.log("LLM Response:", llmResponse);

      const tradeData = parseJSONObjectFromText(llmResponse) as TradeData;
      elizaLogger.info("Trade Data:", tradeData);
      const tradeStatus = await recallClient.exchange(tradeData);
      console.log("Trade Status:", tradeStatus);
      elizaLogger.info(`The Exchange Status: ${tradeStatus}`);
    }
  }

  static async stop(runtime: IAgentRuntime) {
    logger.info("*** Stopping Trading service ***");
    // get the service from the runtime
    const service = runtime.getService(BotService.serviceType);
    if (!service) {
      throw new Error("Trading service not found");
    }
    await service.stop();
  }

  async stop() {
    logger.info("*** Stopping Trading service instance ***");
  }
}
