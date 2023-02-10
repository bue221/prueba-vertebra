import {
  Row,
  Col,
  Typography,
  Progress,
  Tooltip,
  Popover,
  Button,
  Card,
} from "antd";
import {
  BarChartOutlined,
  BulbOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
//
import { IEcoCard } from "./interfaces";
import { styles } from "./styles";

const EcoCard: React.FC<Partial<IEcoCard>> = ({
  record,
  onShop,
  onGroup,
  onAcount,
  type,
}) => {
  return (
    <Popover
      content={
        <>
          {type !== "A" && (
            <div style={styles.containerBtns}>
              {(type === "C" || type === "G") && (
                <Button type="text" onClick={onShop}>
                  Tiendas
                </Button>
              )}
              {type === "C" && (
                <Button type="text" onClick={onGroup}>
                  Grupos
                </Button>
              )}

              <Button type="text" onClick={onAcount}>
                Cuentas
              </Button>
            </div>
          )}
        </>
      }
      trigger="click"
      showArrow={false}
      placement="right"
    >
      <Card bordered style={styles.card} hoverable>
        <Row>
          {record?.account !== undefined && (
            <Col span={24} style={styles.colMargin}>
              <Typography.Text style={styles.accountText}>
                Cuenta: {record.account}
              </Typography.Text>
            </Col>
          )}

          <Col span={24} style={styles.colMargin9}>
            <Typography.Text style={styles.accountText}>
              {record?.name?.toUpperCase()}
            </Typography.Text>
          </Col>

          {record?.base?.map((m) => (
            <>
              {record?.groups !== undefined ? (
                <>
                  <Typography.Text style={styles.baseText}>
                    {m.name}
                  </Typography.Text>
                  <Progress
                    percent={m?.percent}
                    status="active"
                    strokeColor={styles.strokeColor as any}
                    style={styles.colMargin9}
                  />
                </>
              ) : (
                <Tooltip title={m.name} color="#D088B9">
                  <Col span={6} style={styles.colGrid}>
                    {m?.name === "Current Conmsuption" ? (
                      <BulbOutlined style={styles.bulb} />
                    ) : m?.name === "Potential" ? (
                      <span className="material-icons" style={styles.bulb}>
                        battery_charging_full
                      </span>
                    ) : m?.name === "Base Conmsuption" ? (
                      <SlidersOutlined style={styles.bulb} />
                    ) : (
                      <BarChartOutlined style={styles.bulb} />
                    )}

                    <Typography.Text style={styles.baseText}>
                      {m?.percent}
                    </Typography.Text>
                  </Col>
                </Tooltip>
              )}
            </>
          ))}

          {record?.groups !== undefined ? (
            <Tooltip title="groups" color="#009432">
              <Col
                span={record?.groups !== undefined ? 8 : 12}
                style={styles.ColGCenter}
              >
                <Typography.Text>
                  <span className="material-icons" style={styles.spanColor}>
                    groups
                  </span>
                </Typography.Text>

                <Typography.Text style={styles.baseText}>
                  {record?.groups}
                </Typography.Text>
              </Col>
            </Tooltip>
          ) : null}

          {record?.shops !== undefined ? (
            <Tooltip title="shops" color="#009432">
              <Col
                span={record?.groups !== undefined ? 8 : 12}
                style={styles.ColGCenter}
              >
                <Typography.Text>
                  <span className="material-icons" style={styles.spanColor}>
                    storefront
                  </span>
                </Typography.Text>

                <Typography.Text style={styles.baseText}>
                  {record?.shops}
                </Typography.Text>
              </Col>
            </Tooltip>
          ) : null}

          {record?.accounts !== undefined && (
            <Tooltip title="accounts" color="#009432">
              <Col
                span={
                  record?.groups !== undefined
                    ? 8
                    : record?.shops === undefined
                    ? 24
                    : 12
                }
                style={styles.ColGCenter}
              >
                <Typography.Text>
                  <span className="material-icons" style={styles.spanColor}>
                    receipt_long
                  </span>
                </Typography.Text>

                <Typography.Text style={styles.baseText}>
                  {record?.accounts}
                </Typography.Text>
              </Col>
            </Tooltip>
          )}
        </Row>
      </Card>
    </Popover>
  );
};
export default EcoCard;
