import React, { useState } from "react";

const Items = ({
  summary,
  setList,
  setChoosedList,
  list
}: {
  summary?: React.ReactNode,
  setList: React.Dispatch<React.SetStateAction<string[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<string[]>>,
  list: string[]
}) => {
  const data = list.map((item, index) => (
    <span
      id={item + index + list.length}
      key={item + index + list.length}
      onClick={() => {
        new Promise<string[]>((res) => {
          setList((list: string[]) => {
            const array = [ ...list ];
            
            res(array.splice(list.indexOf(item), 1));
            
            return array;
          })
        }).then(data =>
          setChoosedList((list: string[]) => [ ...list, ...data ]));
      }}
    >{item}</span>
  ));

  if (!summary) {
    return data;
  }

  return (
    <>
      <div> { summary } </div>  
      <div> { data } </div>
    </>
  )
};

export const useList = ({
  summary,
  summaryChoosed,
  setList,
  setChoosedList,
  list,
  choosedList
}: {
  summary?: React.ReactNode,
  summaryChoosed?: React.ReactNode,
  setList: React.Dispatch<React.SetStateAction<any[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<any[]>>,
  list: any[],
  choosedList: any[]
}) => {
  return [
    <Items key={summary?.toString() + list.length.toString()} list={list} summary={summary} setList={setList} setChoosedList={setChoosedList} />,
    <Items key={summaryChoosed?.toString() + list.length.toString()} list={choosedList} summary={summaryChoosed} setList={setChoosedList} setChoosedList={setList} />
  ] as const;
}