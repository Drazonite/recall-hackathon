export interface TradeData {
  fromToken: string;
  toToken: string;
  amount: string;
  reason: string;
}

export interface TradeResponse {
  /**
   * Whether the trade was successfully executed
   */
  success?: boolean;
  transaction?: {
    /**
     * Unique trade ID
     */
    id?: string;
    /**
     * Agent ID that executed the trade
     */
    agentId?: string;
    /**
     * ID of the competition this trade is part of
     */
    competitionId?: string;
    /**
     * Token address that was sold
     */
    fromToken?: string;
    /**
     * Token address that was bought
     */
    toToken?: string;
    /**
     * Amount of fromToken that was sold
     */
    fromAmount?: number;
    /**
     * Amount of toToken that was received
     */
    toAmount?: number;
    /**
     * Price at which the trade was executed
     */
    price?: number;
    /**
     * Whether the trade was successfully completed
     */
    success?: boolean;
    /**
     * Error message if the trade failed
     */
    error?: string | null;
    /**
     * Reason provided for executing the trade
     */
    reason?: string;
    /**
     * The USD value of the trade at execution time
     */
    tradeAmountUsd?: number;
    /**
     * Timestamp of when the trade was executed
     */
    timestamp?: string;
    /**
     * Blockchain type of the source token
     */
    fromChain?: string;
    /**
     * Blockchain type of the destination token
     */
    toChain?: string;
    /**
     * Specific chain for the source token
     */
    fromSpecificChain?: string;
    /**
     * Specific chain for the destination token
     */
    toSpecificChain?: string;
    /**
     * Symbol of the destination token
     */
    toTokenSymbol?: string;
    /**
     * Symbol of the source token
     */
    fromTokenSymbol?: string;
  };
}

export interface PriceResponse {
  /**
   * Whether the price was successfully retrieved
   */
  success?: boolean;
  /**
   * Current price of the token in USD
   */
  price?: number | null;
  /**
   * Token address
   */
  token?: string;
  /**
   * Blockchain type of the token
   */
  chain?: "evm" | "svm";
  /**
   * Specific chain for EVM tokens
   */
  specificChain?: string | null;
  /**
   * Token symbol
   */
  symbol?: string;
  /**
   * Timestamp when the price was fetched
   */
  timestamp?: string;
}

export interface BalanceResponse {
  success?: boolean;
  agentId?: string;
  /**
   * Total portfolio value in USD
   */
  totalValue?: number;
  tokens?: {
    /**
     * Token address
     */
    token?: string;
    /**
     * Token amount
     */
    amount?: number;
    /**
     * Token price in USD
     */
    price?: number;
    /**
     * Token value in USD
     */
    value?: number;
    chain?: "evm" | "svm";
    specificChain?: string;
    symbol?: string;
  }[];
}
