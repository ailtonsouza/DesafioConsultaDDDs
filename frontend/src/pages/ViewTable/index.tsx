import React, { useState, useCallback, useEffect, useRef } from 'react';
import NavBar from '../../components/NavBar/burguer';
import api from '../../services/api';
import { Content, Form } from './style';
import DropDownList from '../../components/DropDownList';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ligacao_plano {
  plano: {
    nome: string;
    minutagem: number,
    percentualMinutosExcedidos: number,
  }
}

interface ITarifa {
  id: string;
  valorOriginal: number;
  origemDDDId: string;
  planos: string[];
  origemDDD: {
    nomeCidade: string;
    DDD: string;
  };
  destinoDDD: {
    nomeCidade: string;
    DDD: string;
  };
  destinoDDDId: string;
  ligacao_planos: ligacao_plano[];
}


interface IOptions {
  label: string,
  value: string | null,
}

interface IDDD {
  id: string;
  nomeCidade: string;
  DDD: string;
}

interface Iplano {
  id: string,
  ligacaoId: string;
  planoId: string;
  plano: {
    nome: string
    minutagem: number,
    percentualMinutosExcedidos: number
  }


}

interface Ivalor {
  valorOriginal: number;
  origemDDD: string;
  destinoDDD: string;
}

const ViewTable: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [tarifas, setTarifas] = useState<ITarifa[]>([]);
  const [optionsDDD, setOptionsDDD] = useState<IOptions[]>([]);
  const [planos, setPlanos] = useState<Iplano[]>([]);
  const [DDD, setDDD] = useState<IDDD[]>([]);
  const formRef = useRef<FormHandles>(null);
  const [number, setNumber] = useState<number>(60);

  useEffect(() => {
    async function loadDDD(): Promise<void> {
      const DDDs = await api.get<IDDD[]>('/ddd');
      setDDD(DDDs.data);
    }
    loadDDD();
  }, []);

  useEffect(() => {
    async function loadOptionsDDD(): Promise<void> {

      const value = DDD.map((ddd, i) => {
        return { label: ddd.DDD, value: ddd.id };
      });
      value.push({ label: 'Qualquer', value: '' })

      setOptionsDDD(value);

    }
    loadOptionsDDD();
  }, [DDD]);

  useEffect(() => {
    async function loadListaPLanos(): Promise<void> {
      const listaPlano = await api.get<Iplano[]>(
        `/ligacaoplano`,
      );
      if (listaPlano.data) {
        setPlanos(listaPlano.data);
      } else {
        setPlanos([])
      }
    }
    loadListaPLanos();
  }, []);


  useEffect(() => {
    async function loadTarifas(): Promise<void> {
      const tarifas = await api.get<ITarifa[]>('/ligacao');
      setTarifas(tarifas.data);

      const t = tarifas.data.map(x => {
        return (
          x.ligacao_planos.length !== 0 ?

            x.ligacao_planos.map(y => {
              return {
                valor: x.valorOriginal,
                origemDDD: x.origemDDD.DDD,
                destinoDDD: x.destinoDDD.DDD,
                nomePlano: y.plano.nome,
                franquia: y.plano.minutagem,
                percentualMinutosExcedidos: y.plano.percentualMinutosExcedidos,
              }
            })
            :
            [{
              valor: x.valorOriginal,
              origemDDD: x.origemDDD.DDD,
              destinoDDD: x.destinoDDD.DDD,
              nomePlano: '-',
              franquia: '-',
              percentualMinutosExcedidos: '-'
            }]
        )
      })

      console.log(t)



    }
    loadTarifas();




  }, []);

  const handleSubmit = useCallback(() => {
    setOpen(!open);



  }, [open]);

  async function handleSubmit2(data: Ivalor): Promise<void> {


    if (data.destinoDDD === data.origemDDD && (data.destinoDDD && data.origemDDD !== '')) {
      alert('Os DDDs não podem ser os mesmos');
      return;
    }
    const tarifas = await api.get<ITarifa[]>(`/ligacao?firstId=${data.origemDDD}&secondId=${data.destinoDDD}`); //?
    setTarifas(tarifas.data);
    if (!data.valorOriginal || data.valorOriginal < 0) {
      setNumber(60)
      return
    }
    setNumber(data.valorOriginal)
  };



  return (
    <>


      <NavBar open={open} handleSubmit={handleSubmit} />
      <Content open={open}>
        <div className="header">
          <h1>Gerenciar tarifas</h1>
        </div>
        <div className="body">
          <Form ref={formRef} onSubmit={handleSubmit2}>
            <div className="box">
              <h6>DDD</h6>
              <DropDownList
                name="origemDDD"
                placeHolder="Primeiro DDD"
                options={optionsDDD}
                defaultValue={{ label: 'Qualquer', value: '' }}

              />
            </div>

            <div className="box">

              <h6>DDD</h6>
              <DropDownList
                name="destinoDDD"
                placeHolder="Segundo DDD"
                options={optionsDDD}
                defaultValue={{ label: 'Qualquer', value: '' }}

              />
            </div>
            <div className="box">
              <h6>Numero de minutos</h6>
              <Input
                name="valorOriginal"
                placeholder="Minutos"
                type="float"
              ></Input>
            </div>
            <Button type="submit">Pesquisar</Button>
          </Form>

          <table>
            <tr>
              <td>DDD origem   </td>
              <td> DDD destino   </td>
              <td> Nome plano disponivel   </td>
              <td> Valor do minuto sem plano </td>
              <td> Franquia do plano em minutos </td>
              <td> Minutos usados</td>
              <td> Valor com o plano   </td>
              <td> Valor sem plano   </td>
            </tr>


            {

              tarifas.length !== 0 ? tarifas.map(x => {
                return (

                  x.ligacao_planos.length !== 0 ?

                    x.ligacao_planos.map(y => {
                      return (
                        <tr>
                          <td>{x.origemDDD.DDD}</td>
                          <td>{x.destinoDDD.DDD}</td>
                          <td>{y.plano.nome}</td>
                          <td>R${x.valorOriginal}</td>
                          <td>{y.plano.minutagem}</td>
                          <td>{number}</td>
                          <td>{y.plano.minutagem >= number ? 'R$00.00' : `R$${Number((number - y.plano.minutagem) * y.plano.percentualMinutosExcedidos * x.valorOriginal).toFixed(2)}`}</td>


                          <td>R${Number(x.valorOriginal * number).toFixed(2)}</td>
                        </tr>
                      )
                    })
                    :
                    <tr>
                      <td> {x.origemDDD.DDD}</td>
                      <td> {x.destinoDDD.DDD}</td>
                      <td> N/A</td>
                      <td>R${x.valorOriginal}</td>
                      <td> N/A</td>
                      <td>{number}</td>
                      <td> N/A</td>
                      <td>R${Number(x.valorOriginal * number).toFixed(2)}</td>
                    </tr>
                )
              }) : <td colSpan={8}> As regioes dos DDDs escolhidos não coberto pela Telzir, pesquise por novos DDDs </td>}






            {/* {tarifas.length !== 0 ?

              tarifas.map(t => {
                return (

                  planos.filter((x) => x.ligacaoId === t.id
                  ).map((x, i) => <tbody>
                    <tr>
                      <td>{t.origemDDD.DDD}</td>
                      <td>{t.destinoDDD.DDD}</td>
                      <td>{x.plano.nome}</td>
                      <td>{number}</td>
                      <td>{x.plano.minutagem >= number ? 'R$00.00' : `R$${(number - x.plano.minutagem) * x.plano.percentualMinutosExcedidos * t.valorOriginal}`}</td>
                      <td>R${t.valorOriginal * number}</td>
                    </tr>
                  </tbody>)

                )
              }) : <td colSpan={6}><br />Não existem planos para os DDD solicitados ou eles não fazem parte dos serviços oferecidos pela Telzir</td>} */}

          </table>

        </div>









      </Content>
    </>
  );
};

export default ViewTable;
