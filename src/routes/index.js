import { lazy, Suspense } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Layout } from "../components/Layout";

const ListarOrdem = lazy(() => import("../pages/ListarOrdens"));
const CadastrarOrdem = lazy(() => import("../pages/CadastrarOrdem"));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Suspense fallback="Carregando">
            <Route exact path="/" component={ListarOrdem} />
          </Suspense>
          <Suspense fallback="Carregando">
            <Route exact path="/cadastrar" component={CadastrarOrdem} />
          </Suspense>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};
