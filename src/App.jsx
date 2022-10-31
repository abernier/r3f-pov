import { Canvas } from "@react-three/fiber";
import styled from "@emotion/styled";

import Layout from "./Layout";
import Foo from "./Foo";

function App() {
  return (
    <App.Styled>
      <Canvas shadows>
        <Layout />

        <Foo />
      </Canvas>
    </App.Styled>
  );
}
App.Styled = styled.div`
  position: fixed;
  inset: 0;
`;

export default App;
