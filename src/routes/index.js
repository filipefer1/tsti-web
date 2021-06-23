import { lazy, Suspense } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Layout } from "../components/Layout";

const ListarOrdem = lazy(() => import("../pages/ListarOrdens"));
const CadastrarOrdem = lazy(() => import("../pages/CadastrarOrdem"));
const DetalhesOrdem = lazy(() => import("../pages/DetalhesOrdem"));
const ListarOrdensAdmin = lazy(() => import("../pages/ListarOrdensAdmin"));
const UpdateOrdemAdmin = lazy(() => import("../pages/UpdateOrdemAdmin"));
const ListarOrdensDev = lazy(() => import("../pages/ListarOrdensDev"));

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
          <Suspense fallback="Carregando">
            <Route exact path="/ordem/details/:id" component={DetalhesOrdem} />
          </Suspense>
          <Suspense fallback="Carregando">
            <Route exact path="/admin" component={ListarOrdensAdmin} />
          </Suspense>
          <Suspense fallback="Carregando">
            <Route exact path="/admin/:id" component={UpdateOrdemAdmin} />
          </Suspense>
          <Suspense fallback="Carregando">
            <Route exact path="/dev" component={ListarOrdensDev} />
          </Suspense>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};
