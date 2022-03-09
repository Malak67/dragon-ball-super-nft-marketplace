/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KOVAN_RPC_URL: string;
  readonly VITE_RINKEBY_RPC_URL: string;
  readonly VITE_ROPSTEN_URL: string;
  readonly VITE_PRIVATE_KEY: string;
  readonly VITE_TOKEN_ADDRESS: string;
  readonly VITE_LEDGER_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
