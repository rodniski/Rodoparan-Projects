'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { PieChart, Pie, Label } from "recharts";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

export function AddPneus({ saldo }: { saldo: number }) {
  const [pneus, setPneus] = React.useState(0);

  const chartData = React.useMemo(() => [
    { name: "Adicionados", value: pneus, fill: "hsl(var(--chart-2))" },
    { name: "Restantes", value: saldo - pneus, fill: "hsl(var(--chart-1))" },
  ], [pneus, saldo]);

  const decreasePneus = () => {
    setPneus(prev => Math.max(0, prev - 1));
  };

  const increasePneus = () => {
    setPneus(prev => Math.min(saldo, prev + 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setPneus(Math.min(saldo, Math.max(0, value)));
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline"><IconPlus/></Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adicionar pneus</DrawerTitle>
            <DrawerDescription>
              QUANTIDADE DE PNEUS QUE DESEJA ADICIONAR. Saldo disponível: {saldo}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={decreasePneus}
                disabled={pneus <= 0}
              >
                -
                <span className="sr-only">Diminuir</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">{pneus}</div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Quantidade de Pneus
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={increasePneus}
                disabled={pneus >= saldo}
              >
                +
                <span className="sr-only">Aumentar</span>
              </Button>
            </div>
            <div className="mt-3 h-[200px] flex justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {pneus}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              Pneus
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="mt-4">
              <Input
                type="number"
                value={pneus}
                onChange={handleInputChange}
                min={0}
                max={saldo}
                className="text-center"
                placeholder="Digite a quantidade de pneus"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button>Confirmar</Button>
            <DrawerClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
