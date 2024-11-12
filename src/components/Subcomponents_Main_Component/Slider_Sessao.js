import { useEffect } from "react";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Slider_Sessao_Configuracoes = Pacote_De_Configuracao.Slides;

var Espaco_Dado_Atual_Do_Slide = 0;

export default function Slider_Sessao() {
  useEffect(() => {
    var Numero_Do_Slide_Atual = 0;
    document.getElementById("radio0").checked = true;
    const Div_Principal_Do_Slide = document.querySelector(".primeiro");
    document.querySelector(".slider-content").style.width =
      Slider_Sessao_Configuracoes.length * 100 + "%";
    const Quantia_De_Slides = 100 / Slider_Sessao_Configuracoes.length;
    var Caixas_De_Slide = document.querySelectorAll(".slide-box");

    Caixas_De_Slide.forEach((item) => {
      item.style.width = Quantia_De_Slides + "%";
    });

    setInterval(() => {
      Numero_Do_Slide_Atual++;
      Espaco_Dado_Atual_Do_Slide =
        Quantia_De_Slides + Espaco_Dado_Atual_Do_Slide;

      if (Espaco_Dado_Atual_Do_Slide < 100) {
        Div_Principal_Do_Slide.style.marginLeft =
          "-" + Espaco_Dado_Atual_Do_Slide + "%";
      } else {
        Div_Principal_Do_Slide.style.marginLeft = 0 + "%";
        Espaco_Dado_Atual_Do_Slide = 0;
      }
    }, 5000);
  }, []);

  return (
    <section className="slider">
      <div className="slider-content">
        {Slider_Sessao_Configuracoes.map((item, index) => {
          return (
            <input
              type="radio"
              name="btn-radio"
              id={"radio" + index}
              key={index}
            />
          );
        })}

        {Slider_Sessao_Configuracoes.map((item, index) => {
          return (
            <div
              className={index == 0 ? "slide-box primeiro" : "slide-box"}
              key={index}
            >
              <img
                className="img-desktop"
                src={`./img/Slide_${index}.png`}
                alt={`Slide ${index}`}
              />
              <img
                className="img-mobile"
                src={`./img/Slide_${index}.png`}
                alt={`Slide ${index}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
