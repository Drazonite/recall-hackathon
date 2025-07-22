# AI Wealth Management Bot

## Introduction

An autonomous crypto portfolio management agent that rebalances assets after a certain time using intelligent decision-making. Built with the Eliza framework, this bot eliminates emotional trading and manual oversight while taking calculated risks for higher returns in volatile crypto markets.

Unlike conservative robo-advisors that follow rigid rules, this AI agent adapts to market conditions in real-time, analyzing volatility patterns, asset correlations, and trend momentum. The system provides complete transparency by logging detailed reasoning for every trade decision, enabling users to understand and trust the autonomous rebalancing process while sleeping.

## Technical Implementation

**Core Architecture:**

- **Framework:** Eliza OS for agent orchestration, memory management, and persistent state handling across rebalancing cycles
- **AI Provider:** OpenAI integration for contextual decision-making logic with reasoning chains that evaluate market conditions, portfolio drift, and risk metrics
- **Testing Environment:** Recall Sandbox API for safe simulation and backtesting without real capital exposure
- **Rebalancing Frequency:** 5-minute intervals with real-time monitoring and emergency rebalancing triggers for significant market movements
- **Decision Templates:** Custom prompts in `templates/index.ts` for contextual trading decisions with built-in risk parameters and allocation constraints

**AI Reasoning System:** The agent constructs logical reasoning chains for each trade, evaluating factors like current allocation vs targets, recent price movements, volatility indicators, and correlation matrices. Each decision includes confidence scores and risk assessments, with full audit trails stored for analysis and regulatory compliance.

**Key Features:**

- Multi-asset correlation analysis (USDC, WETH, etc.)
- Volatility-aware position sizing
- Transparent reasoning logs for every trade decision
- Continuous learning from market patterns
- Risk-adjusted allocation targeting

## How to run (Technical):

- Clone this repo into your machine and navigate to the directory using your command line
- Obtain an OpenAI API Key (https://auth.openai.com/create-account)
- Create a .env file on the root directory. You must have the following:

  
  `OPENAI_API_KEY: Open AI Key`
  
  `RECALL_API_KEY: Recall API Key`
  
  `RECALL_URL: https://api.sandbox.competitions.recall.network (Recall URL)`
  
  `REBALANCING_INTERVAL: Interval of checking, in seconds`
  
  
- Run `bun start` to start the agent

## Use Cases

- **Active Crypto Traders:** Eliminates the need for constant market monitoring while maintaining aggressive rebalancing strategies that capture micro-movements and arbitrage opportunities across multiple exchanges
- **DeFi Yield Farmers:** Continuous optimization across lending protocols, liquidity pools, and staking rewards with automated compounding and strategy switching based on APY fluctuations
- **Traditional Portfolio Managers:** Institutional-grade crypto exposure management with detailed reporting, compliance logging, and integration capabilities for existing investment platforms
- **High-Net-Worth Individuals:** 24/7 portfolio management across global time zones with sophisticated risk controls and customizable allocation parameters

Recent example: Agent rebalanced USDC to WETH based on allocation drift and market momentum analysis.

## Future Works

- **Dynamic Strategy Switching:** Voice and text commands like "activate bear market mode" or "increase DeFi allocation to 40%" with immediate strategy pivots and risk parameter adjustments
- **Advanced Natural Language Interface:** Complex instructions like "reduce correlation with traditional markets by 15%" or "optimize for tax-loss harvesting before year-end" with semantic understanding
- **Multi-Chain Portfolio Management:** Cross-chain optimization across Ethereum, Arbitrum, Polygon, and Solana with automated bridging and gas optimization strategies
- **Institutional Features:** Integration with prime brokerages, custom risk models for regulatory compliance, and API connectivity for enterprise portfolio management systems
- **Predictive Analytics:** Machine learning models for market regime detection, correlation breakdown prediction, and optimal rebalancing timing based on historical patterns and volatility forecasting

Built for the future where conversational AI manages wealth like a personal quantitative hedge fund, operating 24/7 across global markets.

---

_Special thanks to Eliza OS and Anonymous Apes for framework and hackathon support._
