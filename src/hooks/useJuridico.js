// Migrado do web: src/data/leis.js + src/components/leis/
// Mudança: nenhuma — dados locais, sem dependências web
import { useState } from "react";

const LEIS_DATA = [
  {
    id: 1,
    titulo: "Lei Maria da Penha",
    artigo: "Lei 11.340/2006",
    descricao:
      "Cria mecanismos para coibir a violência doméstica e familiar contra a mulher.",
    pontos: [
      "Define violência física, psicológica, sexual, patrimonial e moral.",
      "Prevê medidas protetivas de urgência para a vítima.",
      "Aumenta a pena para agressores e agiliza o processo.",
    ],
    link: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm",
  },
  {
    id: 2,
    titulo: "Lei do Feminicídio",
    artigo: "Lei 13.104/2015",
    descricao:
      "Altera o Código Penal para prever o feminicídio como circunstância qualificadora do crime de homicídio.",
    pontos: [
      "Feminicídio é o assassinato de uma mulher pela condição de ser mulher.",
      "Inclui violência doméstica e discriminação de gênero.",
      "É crime hediondo, com penas mais severas.",
      "Pena aumenta se praticado durante gestação ou contra menores/idosas.",
    ],
    link: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13104.htm",
  },
  {
    id: 3,
    titulo: "Lei do Stalking",
    artigo: "Lei 14.132/2021",
    descricao:
      "Inclui o crime de perseguição (stalking) no Código Penal Brasileiro.",
    pontos: [
      "Pena de 1 a 2 anos de reclusão para quem perseguir outra pessoa.",
      "Inclui perseguição física, virtual e por meios tecnológicos.",
      "Pena aumenta se a vítima for mulher, criança, adolescente ou idosa.",
    ],
    link: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14132.htm",
  },
  {
    id: 4,
    titulo: "Lei de Importunação Sexual",
    artigo: "Lei 13.718/2018",
    descricao:
      "Criminaliza a prática de atos libidinosos sem consentimento.",
    pontos: [
      "Pena de 1 a 5 anos de reclusão.",
      "Inclui registro e divulgação não autorizada de imagens íntimas.",
      "É crime de ação penal pública.",
    ],
    link: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13718.htm",
  },
  {
    id: 5,
    titulo: "Lei de Notificação Compulsória",
    artigo: "Lei 10.778/2003",
    descricao:
      "Torna obrigatória a notificação de violência contra a mulher pelos serviços de saúde.",
    pontos: [
      "Visa garantir o registro e acompanhamento dos casos.",
      "O sigilo da vítima é obrigatório.",
      "Ajuda no mapeamento da violência no país.",
    ],
    link: "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.778.htm",
  },
];

export function useJuridico() {
  // Controla qual lei está expandida (null = nenhuma)
  const [leiExpandida, setLeiExpandida] = useState(null);

  const toggleLei = (id) => {
    setLeiExpandida((prev) => (prev === id ? null : id));
  };

  return { leis: LEIS_DATA, leiExpandida, toggleLei };
}
