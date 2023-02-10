import React, { useState } from "react";
import { Button, Result, Tabs } from "antd";
//
import EcoCard from "../EcoCard";
import { useTabs } from "../../context/Companies";
import { styles } from "./styles";
//
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabsContainer: React.FC = () => {
  //
  const { dispatch, state } = useTabs();
  //
  const [activeKey, setActiveKey] = useState(
    state?.tabs ? state?.tabs[0]?.key : ""
  );

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex =
      state?.tabs?.findIndex((pane) => pane.key === targetKey) || 0;
    dispatch({ type: "deleteTab", payload: { key: targetKey as string } });
    if (state?.tabs?.length && targetKey === activeKey) {
      const { key } =
        state?.tabs[
          targetIndex === state?.tabs?.length ? targetIndex : targetIndex - 1
        ];
      setActiveKey(key);
    }
  };

  return (
    <div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        onEdit={remove}
        type="editable-card"
        items={state?.tabs?.map((tab, index) => ({
          label: tab.title,
          children: (
            <div style={styles.containerPane}>
              {tab?.data?.length > 0 ? (
                tab?.data?.map((record, index) => (
                  <EcoCard
                    type={tab.typeData}
                    record={record}
                    index={index}
                    key={index}
                    onShop={() => {
                      dispatch({
                        type: "addTab",
                        payload: {
                          title: `${record?.name}-shops`,
                          typeData: "S",
                          filterName: tab.filterName,
                          filterValue: record?.id ?? "",
                        },
                      });
                      setActiveKey(`${record?.name}-shops`);
                    }}
                    onAcount={() => {
                      dispatch({
                        type: "addTab",
                        payload: {
                          title: `${record?.name}-accounts`,
                          typeData: "A",
                          filterName: tab.filterName,
                          filterValue: record?.id ?? "",
                        },
                      });
                      setActiveKey(`${record?.name}-accounts`);
                    }}
                    onGroup={() => {
                      dispatch({
                        type: "addTab",
                        payload: {
                          title: `${record?.name}-groups`,
                          typeData: "G",
                          filterName: tab.filterName,
                          filterValue: record?.id ?? "",
                        },
                      });
                      setActiveKey(`${record?.name}-groups`);
                    }}
                  />
                ))
              ) : (
                <Result
                  status="404"
                  title="Error 404"
                  subTitle="Esta sección cuenta sin informacion que mostrar."
                />
              )}
            </div>
          ),
          key: `${tab.key}`,
          closable: tab?.closable ?? true,
        }))}
      />
    </div>
  );
};

export default TabsContainer;
