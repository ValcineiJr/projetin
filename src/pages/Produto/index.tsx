import React, { useState } from "react";

import Editor from "../../componentes/Editor";

import Layout from "../Layout";

import { Container } from "./styles";

const Produto: React.FC = () => {
  const initialValue: any = [
    {
      children: [
        {
          bold: true,
          text: "Descrição do produto:",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          bold: true,
          text: "",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Acer Aspire 5 • Processador Intel® Core™ i7 – 10510U – 10° Geração • Sistema Operacional Linux Endless • Tela 15.6” com resolução Full HD • Design Premium com tampa em metal • 512 GB de armazenamento SSD NVMe x4 • Habilitado para upgrade",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
    {
      children: [
        {
          text: "Sistema Operacional Endlesse",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Processador Core i7",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Memória RAM 8GB",
        },
      ],
    },
    {
      children: [
        {
          text: "SSD 512GB",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Alimentação, tipo de bateria • Bateria de 4 células (Li-Íon) 48Wh Autonomia da bateria de até 8 horas10 (dependendo das condições de uso)",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Modelo A515-54-76NA",
        },
      ],
    },
    {
      children: [
        {
          text: "Peso liq. do produto (Kg) 1.8",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Fabricante NX.HQMAL.014",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Marca Acer",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Modelo do Processador 10510U",
        },
      ],
    },
    {
      children: [
        {
          text: "Barramento DDR4",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Cache 8MB",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "HD Não possui",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Placa de Som Dois alto-falantes estéreo • Tecnologia AcerTrueHarmony Gen 2 Microfone duplo • Tecnologia Acer Purified Voice • Compativél com Cortanacom voz",
        },
      ],
    },
    {
      children: [
        {
          text: "Placa de Vídeo UHD Intel® para processadores Intel® Core™ da 10ª geração com memória compartilhada com a memória RAM.",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Placa de Rede Compatível com IEE 802.11a/b/g/n/ac wireless LAN",
        },
      ],
    },
    {
      children: [
        {
          text: "Placa Mãe Intel® Core™ i7 – 10510U",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Drives Não",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Rede Wireless (Wi-Fi): • Compatível com IEE 802.11a/b/g/n/ac wireless LAN • Suporte a redes com frequência de 2.4 GHz e 5 GHz • Com tecnologia 2x2 MU-MIMO • Bluetooth® 5.0 LAN/Rede com fio: • Gigabit Ethernet, Wake on LAN Ready",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Som Dois alto-falantes estéreo • Tecnologia AcerTrueHarmony Gen 2 Microfone duplo • Tecnologia Acer Purified Voice • Compativél com Cortanacom voz",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Mouse Touchpad: • Multi-gestual com dois botões • Certificação Microsoft Precision Touchpad",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: 'Polegadas da Tela 15.6"',
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Conexões Entrada para fonte de alimentação/ Porta RJ-45 /Porta HDMI®1.4b / 2x Portas USB 3.2 Gen 1 (5Gbps) /Porta USB Tipo-C ® 3.2 Gen 1 (5 Gbps) / Entrada padrão combo para alto falante e microfone / Porta USB 2.0 /Trava Kensington",
        },
      ],
    },
    {
      children: [
        {
          text: "Conexão HDMI Sim",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Blu-Ray Não",
        },
      ],
    },
    {
      children: [
        {
          text: "Webcam Integrada Sim",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Leitor Biométrico Não",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Slot para Cartão de Memória Sim",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Softwares Inclusos • Acer Collection • Quick Access • Acer Product Registration",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Voltagem Bivolt",
        },
      ],
    },
    {
      children: [
        {
          text: "Teclado Comum",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Diferenciais Bluetooth",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Código de Barras 4710886931812",
        },
      ],
    },
    {
      children: [
        {
          text: "Peso aproximado da embalagem do produto (ml ou kg) 2.72",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Peso líq. aproximado do produto (ml ou kg) 1.8",
        },
      ],
    },
    {
      children: [
        {
          text: "Dimensões Aproximadas do Produto com Embalagem (AxLxP) 498 (L) x 310 (P) x 65 (A) mm",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Cor PRATA METÁLICO",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Conteúdo da Embalagem Notebook Acer Aspire 5 Fonte carregadora do notebook Manual em português Termo de garantia",
        },
      ],
    },
    {
      children: [
        {
          text: "Garantia do Fornecedor 12 Meses",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Dimensões da embalagem - cm (AxLxP) 49,8 (L) x 31,0 (P) x 6,5 (A) cm",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Dimensões do produto - cm (AxLxP) 36,34 (L) x 24,75 (P) x 2,04 (A) cm",
        },
      ],
    },
    {
      children: [
        {
          text: "Peso da embalagem c/ produto (kg) 2.72",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Peso liq. aproximado do produto (Kg) 1.8",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Referência do Modelo A515-54-76NA",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "SAC 0800 7622237",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Código do Produto NX.HQMAL.014",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Código do Fabricante NX.HQMAL.014",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Modelo Sistema Operacional Linux Endless",
        },
      ],
    },
    {
      children: [
        {
          text: "Modelo Tamanho Tela 15.6 IPS",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Modelo Memória RAM 8 GB RAM DDR4 (4 GB Soldada + 4 GB Módulo)",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "CPU Model 10510U",
        },
      ],
      type: "paragraph",
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Marca Própria Sim",
        },
      ],
    },
    {
      children: [
        {
          text: "Código de homologação (Anatel) 00784-15-06534",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Memória de Vídeo UHD Intel® para processadores Intel® Core™ da 10ª geração com memória compartilhada com a memória RAM.",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Cor PRATA METÁLICO",
        },
      ],
      type: "paragraph",
    },
    {
      children: [
        {
          text: "Voltagem BIVOLT",
        },
      ],
      type: "paragraph",
    },
  ];

  const valueTeste: any = [
    {
      type: "paragraph",
      children: [
        {
          text: "A line of text in a ",
        },
        {
          text: "paragraph",
          bold: true,
        },
        {
          text: ". ",
        },
      ],
    },
  ];
  return (
    <Layout>
      <Container>
        <h1>Cadeira Gamer Terabyte razor, Reclinável</h1>
        <div className="info-container">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diplomado-30e12.appspot.com/o/images%2FCadeira%20MaxRacer%201000x1000.jpg?alt=media&token=f47c3507-ff43-4d82-9b8b-fd6e10bfceee"
            alt=""
          />
          <div className="info">
            <div>
              <p className="bold">Descrição</p>
              <p>
                Aproveite o máximo de tempo nas suas jogatinas, ou no seu
                trabalho com esta cadeira da Terabyte, uma cadeira extremamente
                confortável de qualidade e preço inigualável. Torne-se o melhor
                em seus jogos usufruindo do conforto da cadeira gamer Terabyte.
              </p>
            </div>

            <div className="cart">
              <p> R$: 1.5999,99</p>

              <button>Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
        <div className="bigger-desc">
          <p className="bold">Descrição</p>
          <Editor initialValue={initialValue} />
        </div>
      </Container>
    </Layout>
  );
};

export default Produto;
