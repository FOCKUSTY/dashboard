import React, { useState } from "react";

const Items = ({
  summary,
  setList,
  setChoosedList,
  list
}: {
  summary: React.ReactNode,
  setList: React.Dispatch<React.SetStateAction<string[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<string[]>>,
  list: string[]
}) => {
  return (
    <div>
      { summary }
      
      {
        list.map((item, index) => (
          <span
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
        ))
      }
    </div>
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
  summary: React.ReactNode,
  summaryChoosed: React.ReactNode,
  setList: React.Dispatch<React.SetStateAction<string[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<string[]>>,
  list: string[],
  choosedList: string[]
}) => {
  return [
    <Items list={list} summary={summary} setList={setList} setChoosedList={setChoosedList} />,
    <Items list={choosedList} summary={summaryChoosed} setList={setChoosedList} setChoosedList={setList} />
  ] as const;
}