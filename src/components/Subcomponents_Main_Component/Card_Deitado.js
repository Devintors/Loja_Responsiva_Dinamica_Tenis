import { useState } from "react";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

var Filtros;
var Produtos;
var Quantia_De_Itens_Por_Coluna;

Pacote_De_Configuracao.Card_Deitado.forEach((item) => {
  item.Populares_Sessao.map((sub_item) => {
    Filtros = sub_item.Filtros;
    Produtos = sub_item.Produtos;
    Quantia_De_Itens_Por_Coluna = sub_item.Quantia_De_Itens_Por_Coluna;
  });
});

export default function Card_Deitado() {
  const [Limite_De_Itens_Por_Coluna, setLimite_De_Itens_Por_Coluna] =
    useState();

  return (
    <div className="container-geral">
      {Filtros.map((item) => {
        var Quantia_De_Itens_Criados = 0;

        return (
          <div className="container-card-coluna">
            <div className="contain">
              <div className="left-tenis">{item}</div>
              <div
                className="right-vermais"
                onClick={() => {
                  if (Limite_De_Itens_Por_Coluna == item) {
                    setLimite_De_Itens_Por_Coluna();
                  } else {
                    setLimite_De_Itens_Por_Coluna(item);
                  }
                }}
              >
                {Limite_De_Itens_Por_Coluna == item ? "Ver menos" : "Ver mais"}
              </div>
            </div>

            {Produtos[item].map((sub_item, index) => {
              if (
                (Limite_De_Itens_Por_Coluna == item) |
                (Quantia_De_Itens_Criados !== Quantia_De_Itens_Por_Coluna)
              ) {
                Quantia_De_Itens_Criados++;
                return (
                  <div
                    className="container-card"
                    key={"container-card" + index + sub_item.Nome}
                  >
                    <div className="img-card">
                      <img src="moletom1.png" alt={sub_item.Nome} />
                      <span>
                        {Math.round(
                          (100 -
                            (parseFloat(sub_item.Promocao.replace(",", ".")) /
                              parseFloat(sub_item.Preco.replace(",", "."))) *
                              100) *
                            100
                        ) / 100}
                        %
                      </span>
                    </div>
                    <div className="lado-direito">
                      <div className="nome-item">{sub_item.Nome}</div>
                      <div className="preco-item">
                        R$ {sub_item.Promocao}{" "}
                        <span className="preco-item-desconto">
                          R$ {sub_item.Preco}
                        </span>
                      </div>
                      <div className="parcelas-preco">
                        em até{" "}
                        <span className="parcelas">
                          {sub_item.Parcelamento}
                        </span>{" "}
                        de{" "}
                        <span className="parcelas">
                          R$ {sub_item.Valor_Parcela}
                        </span>
                      </div>
                      <div className="estrelas-lado-direito">
                        {sub_item.Estrelas <= 5 && sub_item.Estrelas >= 0 ? (
                          [...Array(sub_item.Estrelas)].map((_, index) => {
                            return (
                              <i
                                className="fa-solid fa-star"
                                key={"fa-solid fa-star" + index}
                              ></i>
                            );
                          })
                        ) : (
                          <p>Erro</p>
                        )}
                        {sub_item.Estrelas < 5 ? (
                          [...Array(5 - sub_item.Estrelas)].map((_, index) => {
                            return (
                              <i
                                className="fa-regular fa-star"
                                key={"fa-regular fa-star" + index}
                              ></i>
                            );
                          })
                        ) : (
                          <></>
                        )}
                        <button className="botao-ver-mais">Ver Mais</button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}
