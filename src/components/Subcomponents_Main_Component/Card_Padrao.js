import React, { useState, useEffect } from "react";

import Logo from "../../img/Logo.png";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

var Filtros;
var Produtos;
var Categorias_Rotacionadas;

Pacote_De_Configuracao.Card_Padrao.forEach((item) => {
  item.Populares_Sessao.map((sub_item) => {
    Filtros = sub_item.Filtros;
    Produtos = sub_item.Produtos;
    Categorias_Rotacionadas = sub_item.Categoria_Rotacionadas;
  });
});

export default function Card_Padrao() {
  const [
    Localizacao_De_Preenchimento_Do_Botao,
    setLocalizacao_De_Preenchimento_Do_Botao,
  ] = useState({});
  const [Mouse_Em_Cima_Do_Botao, setMouse_Em_Cima_Do_Botao] = useState();
  const [
    Estilizacao_De_Vizualizacao_De_Botoes,
    setEstilizacao_De_Vizualizacao_De_Botoes,
  ] = useState(false);
  const [Verificador_De_Seta_Para_Voltar, setVerificador_De_Seta_Para_Voltar] =
    useState(false);
  const [Verificador_De_Seta_Para_Frente, setVerificador_De_Seta_Para_Frente] =
    useState(true);
  const [Cores_Fora_Do_Padrao, setCores_Fora_Do_Padrao] = useState({});
  const [Cores_Fora_Do_Padrao_Numeros, setCores_Fora_Do_Padrao_Numeros] =
    useState([]);
  const [Filtro_Selecionado_Da_Categoria, setFiltro_Selecionado_Da_Categoria] =
    useState();

  useEffect(() => {
    Filtros.map((item) => {
      document.getElementById(`${item}Container_Id_Para_Controle_De_Rolagem`)
        .clientWidth !==
      document.getElementById(`${item}Container_Id_Para_Controle_De_Rolagem`)
        .scrollWidth
        ? setEstilizacao_De_Vizualizacao_De_Botoes()
        : setEstilizacao_De_Vizualizacao_De_Botoes(item);
    });
  }, []);

  const Mudando_Preenchimento_Conforme_Localizacao_Do_Mouse = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setLocalizacao_De_Preenchimento_Do_Botao({
      top: `${y}%`,
      left: `${x}%`,
      transform: "translate(-50%, -50%) scale(1)",
    });
  };

  const Movimentar_Scroll_Do_Elemento_Para_Frente = (e, id) => {
    setVerificador_De_Seta_Para_Voltar(true);

    const conteudo = document.getElementById(id);

    // Largura do conteúdo visível
    const larguraVisivel = conteudo.clientWidth;
    // Largura total do conteúdo
    const larguraTotal = conteudo.scrollWidth;

    // Calcula a nova posição de rolagem
    const novaPosicao = conteudo.scrollLeft + larguraVisivel / 2;

    // Garante que a nova posição não ultrapasse a largura total
    conteudo.scrollTo({
      left: Math.min(novaPosicao, larguraTotal - larguraVisivel),
      behavior: "smooth",
    });

    if (conteudo.scrollLeft + larguraVisivel >= larguraTotal) {
      setVerificador_De_Seta_Para_Frente(false);
    }
  };

  const Movimentar_Scroll_Do_Elemento_Para_Tras = (e, id) => {
    setVerificador_De_Seta_Para_Frente(true);
    const conteudo = document.getElementById(id);

    // Largura do conteúdo visível
    const larguraVisivel = conteudo.clientWidth;
    // Largura total do conteúdo
    const larguraTotal = conteudo.scrollWidth;

    // Calcula a nova posição de rolagem
    const novaPosicao = conteudo.scrollLeft - larguraVisivel / 2;

    // Garante que a nova posição não ultrapasse a largura total
    conteudo.scrollTo({
      left: Math.min(novaPosicao, larguraTotal - larguraVisivel),
      behavior: "smooth",
    });

    if (novaPosicao <= 0) {
      setVerificador_De_Seta_Para_Voltar(false);
    }
  };

  return (
    <>
      <div className="carousel-container">
        <button className="carousel-button left" id="prevBtn">
          &#10094;
        </button>
        <div className="product-carousel">
          {Filtros.map((item, index) => {
            return (
              <div
                className="product-item"
                key={item + index}
                style={
                  item == Filtro_Selecionado_Da_Categoria
                    ? {
                        border: "5px solid blue",
                      }
                    : {}
                }
              >
                <img
                  src={`./img/Filtros/${item}.png`}
                  alt="Produto 1"
                  onClick={() => {
                    if (Filtro_Selecionado_Da_Categoria == item) {
                      setFiltro_Selecionado_Da_Categoria();
                    } else {
                      setFiltro_Selecionado_Da_Categoria(item);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
        <button className="carousel-button right" id="nextBtn">
          &#10095;
        </button>
      </div>

      {!Filtro_Selecionado_Da_Categoria &&
        Filtros.map((item) => {
          return (
            <div
              key={"Item de card padrao" + item}
              className="Elemento_Pai_Padrao_Para_Correcao_De_Botoes"
            >
              <div
                className={item + "-mais-populares container-cards"}
                id={`${item}Container_Id_Para_Controle_De_Rolagem`}
              >
                <button
                  onClick={(e) => {
                    Movimentar_Scroll_Do_Elemento_Para_Tras(
                      e,
                      `${item}Container_Id_Para_Controle_De_Rolagem`
                    );
                  }}
                  className="Botoes_De_Controle_De_Rolagem"
                  style={
                    Estilizacao_De_Vizualizacao_De_Botoes == item
                      ? { display: "none" }
                      : Verificador_De_Seta_Para_Voltar
                      ? {}
                      : { display: "none" }
                  }
                >
                  <span className="Icon_De_Rolagem">&#10094;</span>
                </button>
                <button
                  onClick={(e) => {
                    Movimentar_Scroll_Do_Elemento_Para_Frente(
                      e,
                      `${item}Container_Id_Para_Controle_De_Rolagem`
                    );
                  }}
                  className="Botoes_De_Controle_De_Rolagem Botoes_De_Controle_De_Rolagem_Direita"
                  style={
                    Estilizacao_De_Vizualizacao_De_Botoes == item
                      ? { display: "none" }
                      : Verificador_De_Seta_Para_Frente
                      ? {}
                      : { display: "none" }
                  }
                >
                  <span className="Icon_De_Rolagem">&#10095;</span>
                </button>
                {Produtos[item].map((sub_item, index) => {
                  return (
                    <div
                      className="product-card"
                      key={sub_item.Nome + sub_item.Descricao + index}
                    >
                      <div className="logo-cart">
                        <img src={Logo} alt="logo" />
                        <i className="fa-brands fa-shopify"></i>
                      </div>
                      <div className="main-images" id="mudar-img">
                        {Cores_Fora_Do_Padrao[sub_item.Nome + index] && (
                          <img
                            className={"active"}
                            src={`./img/${item}/${Cores_Fora_Do_Padrao[
                              sub_item.Nome + index
                            ].replace("#", "")}/${sub_item.Nome}.png`}
                            alt={Cores_Fora_Do_Padrao[sub_item.Nome + index]}
                            id={`Imagem_Do_Tipo_${
                              Cores_Fora_Do_Padrao[sub_item.Nome + index]
                            }`}
                            style={
                              Categorias_Rotacionadas.includes(item)
                                ? {
                                    transform: "rotate(-18deg)",
                                  }
                                : {}
                            }
                          />
                        )}

                        {!Cores_Fora_Do_Padrao[sub_item.Nome + index] &&
                          sub_item.Cores.map((sub_sub_item, index) => {
                            return (
                              <img
                                className={index == 0 ? "active" : ""}
                                src={`./img/${item}/${sub_sub_item.replace(
                                  "#",
                                  ""
                                )}/${sub_item.Nome}.png`}
                                alt={sub_sub_item}
                                id={`Imagem_Do_Tipo_${sub_sub_item}`}
                                style={
                                  Categorias_Rotacionadas.includes(item)
                                    ? {
                                        transform: "rotate(-18deg)",
                                      }
                                    : {}
                                }
                              />
                            );
                          })}
                      </div>
                      <div className="info">
                        <span className="name">{sub_item.Nome}</span>
                        <div className="stars">
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
                            [...Array(5 - sub_item.Estrelas)].map(
                              (_, index) => {
                                return (
                                  <i
                                    className="fa-regular fa-star"
                                    key={"fa-regular fa-star" + index}
                                  ></i>
                                );
                              }
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="color-price">
                        <div className="color-option">
                          <span className="color">Cor:</span>
                          <div className="circles">
                            {sub_item.Cores.map((sub_sub_item, sub_index) => {
                              var Verificador_De_Circulo_Ativo_Padronizado_Ou_Personalizado = true;
                              var Cor_Selecionada;
                              Cores_Fora_Do_Padrao_Numeros.map(
                                (sub_sub_sub_item) => {
                                  if (
                                    Cores_Fora_Do_Padrao[sub_sub_sub_item] &&
                                    sub_sub_sub_item == sub_item.Nome + index
                                  ) {
                                    Verificador_De_Circulo_Ativo_Padronizado_Ou_Personalizado = false;
                                    Cor_Selecionada =
                                      Cores_Fora_Do_Padrao[sub_sub_sub_item];
                                  }
                                }
                              );

                              return (
                                <span
                                  className={
                                    Verificador_De_Circulo_Ativo_Padronizado_Ou_Personalizado
                                      ? sub_index == 0
                                        ? "circle active"
                                        : "circle"
                                      : Cor_Selecionada == sub_sub_item
                                      ? "circle active"
                                      : "circle"
                                  }
                                  onClick={() => {
                                    setCores_Fora_Do_Padrao((prev) => {
                                      return {
                                        ...prev,
                                        [sub_item.Nome + index]: sub_sub_item,
                                      };
                                    });
                                    setCores_Fora_Do_Padrao_Numeros((prev) => {
                                      var Verificador_De_Duplicidade_De_Cores_Fora_Do_Padrao_Numero = true;

                                      prev.map(
                                        (Itens_Ja_Adicionados_No_Array) => {
                                          if (
                                            Itens_Ja_Adicionados_No_Array ==
                                            sub_item.Nome + index
                                          ) {
                                            Verificador_De_Duplicidade_De_Cores_Fora_Do_Padrao_Numero = false;
                                          }
                                        }
                                      );

                                      if (
                                        Verificador_De_Duplicidade_De_Cores_Fora_Do_Padrao_Numero
                                      ) {
                                        return [...prev, sub_item.Nome + index];
                                      } else return [...prev];
                                    });
                                  }}
                                  data-option={sub_sub_item}
                                  style={{ "--color": sub_sub_item }}
                                ></span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="price">
                          <span className="price_num">R$ {sub_item.Preco}</span>
                        </div>
                      </div>
                      <button
                        className="button-cardss"
                        onMouseEnter={(e) => {
                          setMouse_Em_Cima_Do_Botao(sub_item.Nome + index);
                          Mudando_Preenchimento_Conforme_Localizacao_Do_Mouse(
                            e
                          );
                        }}
                        onMouseLeave={() => {
                          setMouse_Em_Cima_Do_Botao();
                        }}
                      >
                        <span
                          className="Preenchimento_Do_Botao_Animacao"
                          style={
                            Mouse_Em_Cima_Do_Botao == sub_item.Nome + index
                              ? {
                                  transition: "background 0.1s, padding 1s",
                                  ...Localizacao_De_Preenchimento_Do_Botao,
                                  backgroundColor: "black",
                                  padding: "120%",
                                }
                              : {
                                  ...Localizacao_De_Preenchimento_Do_Botao,
                                }
                          }
                        ></span>
                        Informações
                      </button>
                    </div>
                  );
                })}
              </div>
              <br />
            </div>
          );
        })}

      {Filtro_Selecionado_Da_Categoria && (
        <div
          key={"Item de card padrao" + Filtro_Selecionado_Da_Categoria}
          className="Elemento_Pai_Padrao_Para_Correcao_De_Botoes"
        >
          <div
            className={
              Filtro_Selecionado_Da_Categoria +
              "-mais-populares container-cards"
            }
            id={`${Filtro_Selecionado_Da_Categoria}Container_Id_Para_Controle_De_Rolagem`}
          >
            <button
              onClick={(e) => {
                Movimentar_Scroll_Do_Elemento_Para_Tras(
                  e,
                  `${Filtro_Selecionado_Da_Categoria}Container_Id_Para_Controle_De_Rolagem`
                );
              }}
              className="Botoes_De_Controle_De_Rolagem"
              style={
                Estilizacao_De_Vizualizacao_De_Botoes ==
                Filtro_Selecionado_Da_Categoria
                  ? { display: "none" }
                  : Verificador_De_Seta_Para_Voltar
                  ? {}
                  : { display: "none" }
              }
            >
              <span className="Icon_De_Rolagem">&#10094;</span>
            </button>
            <button
              onClick={(e) => {
                Movimentar_Scroll_Do_Elemento_Para_Frente(
                  e,
                  `${Filtro_Selecionado_Da_Categoria}Container_Id_Para_Controle_De_Rolagem`
                );
              }}
              className="Botoes_De_Controle_De_Rolagem Botoes_De_Controle_De_Rolagem_Direita"
              style={
                Estilizacao_De_Vizualizacao_De_Botoes ==
                Filtro_Selecionado_Da_Categoria
                  ? { display: "none" }
                  : Verificador_De_Seta_Para_Frente
                  ? {}
                  : { display: "none" }
              }
            >
              <span className="Icon_De_Rolagem">&#10095;</span>
            </button>
            {Produtos[Filtro_Selecionado_Da_Categoria].map(
              (sub_item, index) => {
                return (
                  <div
                    className="product-card"
                    key={sub_item.Nome + sub_item.Descricao + index}
                  >
                    <div className="logo-cart">
                      <img src={Logo} alt="logo" />
                      <i className="fa-brands fa-shopify"></i>
                    </div>
                    <div className="main-images" id="mudar-img">
                      {Cores_Fora_Do_Padrao[sub_item.Nome + index] && (
                        <img
                          className={"active"}
                          src={`./img/${Filtro_Selecionado_Da_Categoria}/${Cores_Fora_Do_Padrao[
                            sub_item.Nome + index
                          ].replace("#", "")}/${sub_item.Nome}.png`}
                          alt={Cores_Fora_Do_Padrao[sub_item.Nome + index]}
                          id={`Imagem_Do_Tipo_${
                            Cores_Fora_Do_Padrao[sub_item.Nome + index]
                          }`}
                          style={
                            Categorias_Rotacionadas.includes(
                              Filtro_Selecionado_Da_Categoria
                            )
                              ? {
                                  transform: "rotate(-18deg)",
                                }
                              : {}
                          }
                        />
                      )}

                      {!Cores_Fora_Do_Padrao[sub_item.Nome + index] &&
                        sub_item.Cores.map((sub_sub_item, index) => {
                          return (
                            <img
                              className={index == 0 ? "active" : ""}
                              src={`./img/${Filtro_Selecionado_Da_Categoria}/${sub_sub_item.replace(
                                "#",
                                ""
                              )}/${sub_item.Nome}.png`}
                              alt={sub_sub_item}
                              id={`Imagem_Do_Tipo_${sub_sub_item}`}
                              style={
                                Categorias_Rotacionadas.includes(
                                  Filtro_Selecionado_Da_Categoria
                                )
                                  ? {
                                      transform: "rotate(-18deg)",
                                    }
                                  : {}
                              }
                            />
                          );
                        })}
                    </div>
                    <div className="info">
                      <span className="name">{sub_item.Nome}</span>
                      <div className="stars">
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
                      </div>
                    </div>
                    <div className="color-price">
                      <div className="color-option">
                        <span className="color">Cor:</span>
                        <div className="circles">
                          {sub_item.Cores.map((sub_sub_item, sub_index) => {
                            var Verificador_De_Circulo_Ativo_Padronizado_Ou_Personalizado = true;
                            var Cor_Selecionada;
                            Cores_Fora_Do_Padrao_Numeros.map(
                              (sub_sub_sub_item) => {
                                if (
                                  Cores_Fora_Do_Padrao[sub_sub_sub_item] &&
                                  sub_sub_sub_item == sub_item.Nome + index
                                ) {
                                  Verificador_De_Circulo_Ativo_Padronizado_Ou_Personalizado = false;
                                  Cor_Selecionada =
                                    Cores_Fora_Do_Padrao[sub_sub_sub_item];
                                }
                              }
                            );

                            return (
                              <span
                                className={
                                  Verificador_De_Circulo_Ativo_Padronizado_Ou_Personalizado
                                    ? sub_index == 0
                                      ? "circle active"
                                      : "circle"
                                    : Cor_Selecionada == sub_sub_item
                                    ? "circle active"
                                    : "circle"
                                }
                                onClick={() => {
                                  setCores_Fora_Do_Padrao((prev) => {
                                    return {
                                      ...prev,
                                      [sub_item.Nome + index]: sub_sub_item,
                                    };
                                  });
                                  setCores_Fora_Do_Padrao_Numeros((prev) => {
                                    var Verificador_De_Duplicidade_De_Cores_Fora_Do_Padrao_Numero = true;

                                    prev.map(
                                      (Itens_Ja_Adicionados_No_Array) => {
                                        if (
                                          Itens_Ja_Adicionados_No_Array ==
                                          sub_item.Nome + index
                                        ) {
                                          Verificador_De_Duplicidade_De_Cores_Fora_Do_Padrao_Numero = false;
                                        }
                                      }
                                    );

                                    if (
                                      Verificador_De_Duplicidade_De_Cores_Fora_Do_Padrao_Numero
                                    ) {
                                      return [...prev, sub_item.Nome + index];
                                    } else return [...prev];
                                  });
                                }}
                                data-option={sub_sub_item}
                                style={{ "--color": sub_sub_item }}
                              ></span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="price">
                        <span className="price_num">R$ {sub_item.Preco}</span>
                      </div>
                    </div>
                    <button
                      className="button-cardss"
                      onMouseEnter={(e) => {
                        setMouse_Em_Cima_Do_Botao(sub_item.Nome + index);
                        Mudando_Preenchimento_Conforme_Localizacao_Do_Mouse(e);
                      }}
                      onMouseLeave={() => {
                        setMouse_Em_Cima_Do_Botao();
                      }}
                    >
                      <span
                        className="Preenchimento_Do_Botao_Animacao"
                        style={
                          Mouse_Em_Cima_Do_Botao == sub_item.Nome + index
                            ? {
                                transition: "background 0.1s, padding 1s",
                                ...Localizacao_De_Preenchimento_Do_Botao,
                                backgroundColor: "black",
                                padding: "120%",
                              }
                            : {
                                ...Localizacao_De_Preenchimento_Do_Botao,
                              }
                        }
                      ></span>
                      Informações
                    </button>
                  </div>
                );
              }
            )}
          </div>
          <br />
        </div>
      )}
    </>
  );
}
