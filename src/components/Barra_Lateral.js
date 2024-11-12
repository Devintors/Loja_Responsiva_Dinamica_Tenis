import Logo from "../img/Logo.png";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Barra_Lateral_Barra_Lateral = Pacote_De_Configuracao.Barra_Lateral;

export default function Barra_Lateral() {
  return (
    <div className="barra-lateral">
      <div>
        <div className="nome-pagina">
          <img
            src={Logo}
            alt=""
            width="50px"
            id="cloud"
            name="cloud-outline"
            style={{ borderRadius: "20%" }}
          />
          <span>{Pacote_De_Configuracao.Nome}</span>
        </div>
        <button className="botao">
          <ion-icon name="add-outline"></ion-icon>
          <span>Procurar</span>
        </button>
      </div>

      <nav className="navegacao">
        <ul>
          {Barra_Lateral_Barra_Lateral.map((item) => {
            return (
              <li key={item.Link + item.Nome_Do_Icone + item.Nome}>
                <a href={item.Link}>
                  <ion-icon name={item.Nome_Do_Icone}></ion-icon>
                  <span>{item.Nome}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div>
        <div className="linha"></div>

        <div className="modo-escuro">
          <div className="info">
            <ion-icon name="moon-outline"></ion-icon>
            <span>Modo Noite</span>
          </div>
          <div className="switch">
            <div className="base">
              <div className="circulo"></div>
            </div>
          </div>
        </div>

        <div className="usuario">
          <img src="logo.png" alt="" />
          <div className="info-usuario">
            <div className="nome-email">
              <span className="nome">{Pacote_De_Configuracao.Nome}</span>
              <span className="email">{Pacote_De_Configuracao.Email}</span>
            </div>
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
