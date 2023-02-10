export interface IEcoCard {
  record: {
    id?: number | string;
    name?: string;
    groups?: number | string;
    shops?: number;
    accounts?: number;
    base?: {
      name: string;
      percent: number;
      color: string;
    }[];
    account?: any;
  };
  index?: number;
  onShop?: onclick;
  onGroup?: onclick;
  onAcount?: onclick;
  type: "A" | "C" | "G" | "S" | string;
}

export type onclick = React.MouseEventHandler<HTMLElement> | undefined;
