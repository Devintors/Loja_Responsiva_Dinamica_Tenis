import Slider_Sessao from "./Subcomponents_Main_Component/Slider_Sessao";
import Populares_Sessao from "./Subcomponents_Main_Component/Populares_Sessao";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

var Nome_Da_Empresa = Pacote_De_Configuracao.Nome;

var Ultima_Letra_No_Nome = Nome_Da_Empresa.slice(-1);

export default function Main_Component() {
  return (
    <main>
      <div className="responsive-div">
        <span className="cor-dev"></span>
        {Nome_Da_Empresa.slice(0, -1).toUpperCase()}
        <span className="cor-dev">{Ultima_Letra_No_Nome.toUpperCase()}</span>
      </div>
      <Slider_Sessao />
      <Populares_Sessao />
    </main>
  );
}
