
'use client'


import React, { useState } from "react";
import { motion } from "framer-motion";
import Badge from "./Resources/Badge";
import Modal from "./Resources/Modal";
import ContactForm from "./ContactForm";

const Categorias = ({ category, products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-slate-100 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-red-700 mb-8">{category}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.keys(products).map((productName) => {
            const product = products[productName];
            return (
              <motion.div
                key={productName}
                className="box bg-white rounded-lg overflow-hidden shadow-md hover:ring-2 hover:ring-amber-200 flex flex-col"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeInOut" }
                }}
              >
                <div className="relative" style={{ paddingBottom: "100%" }}>
                  <img
                    src={product.image}
                    alt={productName}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                      {productName}
                    </h3>
                    <Badge
                      peso={product.Peso}
                      potencia={product.Potencia}
                      capacidade={product.Capacidade}
                      tipo={product.Tipo}
                      controle={product.Controle}
                      cargaNominal={product["Carga Nominal"]}
                      tipoLamina={product["Tamanho da Lâmina"]}
                      forcaCentrifuga={product["Força Centrífuga"]}
                      pesoBruto={product["Peso Bruto"]}
                    />
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => handleOpenModal(product)}
                    >
                      Orçamento
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.293 6.707a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <a
                      href={product.href}
                      className="block text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Mais Informações
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showModal && selectedProduct && (
          <Modal onClose={handleCloseModal} productName={selectedProduct.name}>
            <ContactForm
              productName={selectedProduct.name}
              productImage={selectedProduct.Src}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Categorias;
