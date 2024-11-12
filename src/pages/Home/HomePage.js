import "./style.css";
import "./Estilo_Carrossel_Selecao.css";
import "./Estilo_Inicio.css";

import "./Estilo_Loja1.css";
import "./Estilo_Loja3_Card.css";
import "./Estilo_Menu_Lateral.css";
import "./Estilo_Rodape.css";
import "./Estilo_Slide_1.css";

import Menu_De_Navegacao from "../../components/Menu_De_Navegacao";
import Barra_Lateral from "../../components/Barra_Lateral";
import Main_Component from "../../components/Main_Component";

export default function HomePage() {
  return (
    <div className="Corpo_Site">
      <Menu_De_Navegacao />
      <Barra_Lateral />
      <Main_Component />
    </div>
  );
}
