import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabelaRender } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { dataFetching } from "@/lib/dataFetching"; // Importando a função dataFetching
import { getData } from "@/lib/idb"; // Importando função para buscar dados do IndexedDB

const Tabela = () => {
  const [generalData, setGeneralData] = useState<any[]>([]);
  const [personalData, setPersonalData] = useState<any[]>([]);
  const [loadingGeneral, setLoadingGeneral] = useState(true);
  const [loadingPersonal, setLoadingPersonal] = useState(true);
  const [errorGeneral, setErrorGeneral] = useState(false);
  const [errorPersonal, setErrorPersonal] = useState(false);

  // Função para buscar dados gerais
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingGeneral(true);
        const result = await dataFetching(); // Chama a função dataFetching
        setGeneralData(result.generalData || []); // Salva os dados gerais
        setLoadingGeneral(false);
      } catch (error) {
        console.error("Erro ao buscar dados gerais:", error);
        setErrorGeneral(true);
        setLoadingGeneral(false);
      }
    };

    fetchData();
  }, []);

  // Função para buscar dados filtrados do IndexedDB
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        setLoadingPersonal(true);
        const filteredData = await getData("filteredData"); // Busca os dados filtrados do IndexedDB
        setPersonalData(filteredData || []);
        setLoadingPersonal(false);
      } catch (error) {
        console.error("Erro ao buscar dados filtrados:", error);
        setErrorPersonal(true);
        setLoadingPersonal(false);
      }
    };

    fetchPersonalData();
  }, []);

  return (
    <motion.div
      className="w-full h-full p-2 overflow-hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
    >
      <Tabs defaultValue="general" className="w-full h-full flex flex-col">
        <div className="relative flex items-center justify-between w-full mb-5 space-x-4">
          <TabsList className="bg-card">
            <TabsTrigger  value="general">Geral</TabsTrigger>
            <TabsTrigger  value="personal">Minhas Pré Notas</TabsTrigger>
          </TabsList>

          <h1 className=" text-lg lg:text-2xl 2xl:text-3xl absolute left-1/2 transform -translate-x-1/2 font-bold">
            Tabela de Pré Notas
          </h1>

          <motion.div className="space-x-2" whileTap={{ scale: 0.95 }}>
            <Button className="px-4 py-2 rounded-md border border-neutral-300 bg-transparent text-foreground text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-transparent">
              <a href="/inicio">Adicionar XML</a>
            </Button>
            <Button className="px-4 py-2 rounded-md border text-white hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              <a href="/inicio/incluir">Adicionar Manualmente</a>
            </Button>
          </motion.div>
        </div>

        {/* Conteúdo da aba "Geral" */}
        <TabsContent value="general">
          {loadingGeneral ? (
            <motion.p>Carregando dados...</motion.p>
          ) : errorGeneral ? (
            <motion.p>Erro ao carregar dados gerais.</motion.p>
          ) : generalData && generalData.length > 0 ? (
            <TabelaRender
              columns={columns}
              data={generalData}
              loading={loadingGeneral}
            />
          ) : (
            <motion.p>Nenhuma pré-nota encontrada.</motion.p>
          )}
        </TabsContent>

        {/* Conteúdo da aba "Minhas Pré Notas" */}
        <TabsContent value="personal">
          {loadingPersonal ? (
            <motion.p>Carregando dados...</motion.p>
          ) : errorPersonal ? (
            <motion.p>Erro ao carregar dados filtrados.</motion.p>
          ) : personalData && personalData.length > 0 ? (
            <TabelaRender
              columns={columns}
              data={personalData}
              loading={loadingPersonal}
            />
          ) : (
            <motion.p>Nenhuma pré-nota encontrada para o usuário.</motion.p>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Tabela;
