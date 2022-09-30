/* eslint-disable no-unused-vars */
export type ISupportedNetwork = "mainnet" | "rinkeby";

export type INetwork<T> = { [network in ISupportedNetwork]: T };
