import { elizaLogger } from "@elizaos/core";
import {
  BalanceResponse,
  PriceResponse,
  TradeData,
  TradeResponse,
} from "src/types";

export class RecallClient {
  apiKey: string;

  constructor(apiKey: string) {
    console.log("Recall Client Initialized");
    this.apiKey = apiKey;
  }

  async fetchWithRetry(fn: () => Promise<any>, retries = 3, delay = 1000) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fn();
        if (!response.ok) {
          console.log("Here is the response:", await response.json())
          //throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json(); // or response.text(), etc.
      } catch (error) {
        if (attempt < retries) {
          console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          delay *= 2; // exponential backoff
        } else {
          console.error('All retries failed.');
          return 'failure'
          //throw error;
        }
      }
    }
  }

  async exchange(exchangeData: TradeData) {
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };

    console.log("Here is the exchangeData", exchangeData)

    const data = await this.fetchWithRetry(async () => await fetch(
      `${process.env.RECALL_URL}/api/trade/execute`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(exchangeData),
      },
    ));

    elizaLogger.info("Exchange Response:", data);

    return data.success;
  }

  async getPrice(tokenAddress: string) {
    const data = await this.fetchWithRetry(async () => await fetch(
      `${process.env.RECALL_URL}/api/price?token=${tokenAddress}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          token: tokenAddress,
        }),
      },
    ));

    return data.price;
  }

  async getWalletDetails() {
    const response = await fetch(
      `${process.env.RECALL_URL}/api/agent/portfolio`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    const data = (await response.json()) as BalanceResponse;

    return data.tokens;
  }
}
