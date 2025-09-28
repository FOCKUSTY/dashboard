import React from "react";

const onClickDefault = ({
  item,
  setChoosedList,
  setList
}: {
  setList: React.Dispatch<React.SetStateAction<string[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<string[]>>,
  item: string
}) => {
  new Promise<string[]>((res) => {
    setList((list: string[]) => {
      const array = [ ...list ];
      
      res(array.splice(list.indexOf(item), 1));
      
      return array;
    })
  }).then(data =>
    setChoosedList((list: string[]) => [ ...list, ...data ]));
}

const Items = ({
  summary,
  setList,
  setChoosedList,
  callbackfn,
  list
}: {
  summary?: React.ReactNode,
  setList: React.Dispatch<React.SetStateAction<string[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<string[]>>,
  callbackfn?: (value: string, index: number, array: string[]) => React.JSX.Element
  list: string[]
}) => {
  const data = list.map(callbackfn ?? ((item, index) => (
    <span
      id={item + index + list.length}
      key={item + index + list.length}
      onClick={() => onClickDefault({ item, setList, setChoosedList })}
    >{item}</span>
  )));

  if (!summary) {
    return data;
  }

  return (
    <>
      <div>{summary}</div>  
      <div>{data}</div>
    </>
  )
};

export const useList = ({
  summary,
  summaryChoosed,
  setList,
  setChoosedList,
  list,
  choosedList,
  callbackfn
}: {
  summary?: React.ReactNode,
  summaryChoosed?: React.ReactNode,
  setList: React.Dispatch<React.SetStateAction<any[]>>,
  setChoosedList: React.Dispatch<React.SetStateAction<any[]>>,
  list: any[],
  choosedList: any[],
  callbackfn?: (value: string, index: number, array: string[]) => React.JSX.Element
}) => {
  return [
    <Items
      key={summary?.toString() + list.length.toString()}
      list={list}
      summary={summary}
      setList={setList}
      setChoosedList={setChoosedList}
      callbackfn={callbackfn}
    />,
    <Items
      key={summaryChoosed?.toString() + list.length.toString()}
      list={choosedList}
      summary={summaryChoosed}
      setList={setChoosedList}
      setChoosedList={setList}
      callbackfn={callbackfn}
    />
  ] as const;
}