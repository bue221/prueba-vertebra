import * as React from "react";
// data
import companiesJSON from "../../db/Company.json";
import accountsJSON from "../../db/Account.json";
import groupsJSON from "../../db/Groups.json";
import shopsJSON from "../../db/Shops.json";

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | {
      type: "deleteTab";
      payload: {
        key: string;
      };
    }
  | {
      type: "addTab";
      payload: {
        typeData: string;
        filterName: string;
        filterValue: string | number;
        title: string;
      };
    };
type Dispatch = (action: Action) => void;
type State = {
  tabs?: {
    key: string;
    title: string;
    data:
      | typeof companiesJSON.data
      | typeof groupsJSON.data
      | typeof accountsJSON.data
      | typeof shopsJSON.data;
    typeData: string;
    filterName: string;
    closable: boolean;
  }[];
};
type TabsProviderProps = { children: React.ReactNode };

const TabsStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const dataDB: any = {
  C: { data: companiesJSON.data, idFilter: "idCompany" },
  G: { data: groupsJSON.data, idFilter: "idGroup" },
  A: { data: accountsJSON.data, idFilter: "idAccount" },
  S: { data: shopsJSON.data, idFilter: "idShop" },
};

function tabsReducer(state: State, action: Action) {
  switch (action.type) {
    case "addTab": {
      let tab = {
        key: action.payload.title,
        title: action.payload.title,
        data: dataDB[action.payload.typeData].data.filter(
          (i: any) =>
            i[action.payload.filterName] === action.payload.filterValue
        ),
        typeData: action.payload.typeData,
        filterName: dataDB[action.payload.typeData].idFilter,
      };
      return {
        tabs: [
          ...(state.tabs?.filter(
            (i) => i.title !== action.payload.title
          ) as any),
          tab,
        ],
      };
    }
    case "deleteTab": {
      return {
        tabs: [
          ...(state.tabs?.filter(
            (tab) => tab.key !== action.payload.key
          ) as any),
        ],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TabsProvider({ children }: TabsProviderProps) {
  const [state, dispatch] = React.useReducer(tabsReducer, {
    tabs: [
      {
        key: "compañias",
        title: "compañias",
        data: companiesJSON.data,
        typeData: "C",
        filterName: "idCompany",
        closable: false,
      },
    ],
  });

  const value = { state, dispatch };
  return (
    <TabsStateContext.Provider value={value}>
      {children}
    </TabsStateContext.Provider>
  );
}

function useTabs() {
  const context = React.useContext(TabsStateContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { TabsProvider, useTabs };
