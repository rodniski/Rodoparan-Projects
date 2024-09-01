const NomeDoProduto = {
    categoria: "{Categoria do Produto}",
    name: "SANY + {Nome do Produto}",
    desc: "{descrição do produto, favor criar uma diferente.}",
    image: "{/{categoria}/{modelo}/1.png",
    features: {
      high1: {
        descrição: "{Titulo}: {Valor}",
        image: "/svgs/{svg de acordo}",
      },
      high2: {
        descrição: "{Titulo}: {Valor}",
        image: "/svgs/{svg de acordo}",
      },
      high3: {
        descrição: "{Titulo}: {Valor}",
        image: "/svgs/{svg de acordo}",
      },
    },
  
    dev: {
      titulo: "{Bulletpoint de aprofundamento da maquina}",
      "seg.Desc": "{Descrição que contempla o bulletpoint principal}",
      image: "sy155h_dev_image.jpg",
      high: {
        high1: {
          title: "{titulo da feature}",
          desc: "{descrição da feature}",
          image: "/svgs/{svg de acordo}",
        },
        high2: {
          title: "{titulo da feature}",
          desc: "{descrição da feature}",
          image: "/svgs/{svg de acordo}",
        },
        high3: {
          title: "{titulo da feature}",
          desc: "{descrição da feature}",
          image: "/svgs/{svg de acordo}",
        },
      },
    },
    specs: {
      "{categoria}": {
        titulo: "{primeira categoria da ficha tecnica}",
        image: "/svgs/{svg de acordo}",
        data: {
          "{dados da primeira categoria da ficha tecnica}":"{valor}", 
        },
      },
    },
  };
  
  export default NomeDoProduto;