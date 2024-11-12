import Card_Padrao from "./Card_Padrao";
import Card_Deitado from "./Card_Deitado";

export default function Populares_Sessao() {
  return (
    <section className="populares secao bd-container" id="populares">
      <div className="conteudo-populares">
        <div className="titulos">
          <span className="subtitulo-secao">aproveite</span>
          <h1 className="titulo-secao">Os mais populares</h1>
        </div>

        {/* Card Padrao */}
        <Card_Padrao />

        {/* Card Deitado */}
        <Card_Deitado />

        {/* <!-- ICONS --> */}

        <div className="inicio">
          <div className="sub-inicio">
            <div className="texto-inicio">
              <h1>O Melhor em Tênis Está Aqui!</h1>
              <p>
                Venha conhecer as novidades da nossa loja de tênis. Temos tudo
                para você andar com muito estilo e conforto. Aproveite nossas
                ofertas exclusivas e produtos de alta qualidade!
              </p>

              <a href="#" className="botao-inicio">
                Saiba Mais
              </a>
            </div>
            <div className="img-container">
              <div className="circulo"></div>
              <div className="img-inicio">
                <img src="ney.png" alt="Imagem Festa Junina" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
