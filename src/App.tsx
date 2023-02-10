import { Layout, Typography } from "antd";
//
import { TabsProvider } from "./context/Companies";
import TabsContainer from "./components/TabsContainer";
import { styles } from "./styles/app.styles";
//
const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  return (
    <TabsProvider>
      <Layout style={styles.mainLayout}>
        <Header style={styles.flex1}>
          <Typography.Title style={styles.title}>
            Prueba técnica Vertebra
          </Typography.Title>
        </Header>
        <Content style={styles.flex8}>
          <TabsContainer />
        </Content>
        <Footer style={styles.flexFooter}>
          &copy; {new Date().getFullYear()} hecho por @bue221
        </Footer>
      </Layout>
    </TabsProvider>
  );
};

export default App;
