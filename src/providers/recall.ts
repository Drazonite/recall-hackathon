import type { Plugin } from "@elizaos/core";
import {
  type IAgentRuntime,
  type Memory,
  type Provider,
  type ProviderResult,
  type State,
} from "@elizaos/core";
import { RecallClient } from "src/clients/recallClient";

export const recallProvider: Provider = {
  name: "WALLET_PROVIDER",
  description: "A wallet provider to obtain the wallet details and prices.",

  get: async (_runtime: IAgentRuntime): Promise<ProviderResult> => {
    // Function goes here
    const recallClient = new RecallClient(process.env.RECALL_API_KEY);
    const data = await recallClient.getWalletDetails();

    let walletText = ``;

    for (const tokenData of data.filter((d) => !!d.amount)) {
      const text = `
        ====================================================================================
        Here is the token symbol: ${tokenData.symbol}
        Here is the token address: ${tokenData.token}
        Here is the amount you own (in USD): ${tokenData.value}
        Here is the current price of the token (In USD): ${tokenData.price}
        Here is the chain: ${tokenData.chain}
        `;
      walletText += text + "\n\n";
    }

    const text = `
      Here is your current portfolio:

      ${walletText}
      `;

    return {
      text,
      values: {},
      data: {},
    };
  },
};
