import { useState } from "react";
import {LoginPage} from "../pages/index.ts";
import RoutingMain from "../Routes/RoutingMain.tsx";
import './App.css'

function App() {

  const [loginValid, setLoginValid] = useState<boolean>(false);

  return (
    <>
      {loginValid ? <RoutingMain/> : <LoginPage setLoginValid={setLoginValid}/>}
    </>
  )
}

export default App
