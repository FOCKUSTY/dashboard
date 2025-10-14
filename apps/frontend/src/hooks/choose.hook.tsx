'use client'

import { Dropdown } from "components/dropdown";

type ChooseComponent = {
  summary: React.ReactNode,
  main: React.ReactNode
}

type DropdownProps = {
  id: string,
  summary: React.ReactNode
  className?: string,
  mainClassName?: string,
  summaryClassName?: string,
  elementClassName?: string,
}

type Props = {
  components: ChooseComponent[],
  currentIndex: number,

  id?: string;
  className?: string

  dropdown: DropdownProps,

  onChange: (current: number) => unknown,
};

export const useChoose = ({
  components,
  currentIndex,
  dropdown,
  className,
  id,
  onChange,
}: Props) => {
  if (components.length <= 1) {
    throw new Error("Can not resolve 0 or 1 component to choose");
  }

  if (currentIndex > components.length-1) {
    throw new Error("currentIndex more then length of components");
  }

  const dropdownComponent = (
    <div key={"dropdown"} {...{className,id}}>
      <Dropdown
        {...{...dropdown}}
      >
        {
          components.map((component, componentIndex) => (
            componentIndex === currentIndex
              ? <></>
              : (
                <button
                  key={componentIndex}
                  className={dropdown.elementClassName}
                  onClick={() => onChange(componentIndex)}
                >{component.summary}</button>
              )
          ))
        }
      </Dropdown>
    </div>
  )

  const element = (
    <div key={"element"}>
      {components[currentIndex].main}
    </div>
  );

  return {
    dropdown: dropdownComponent,
    current: element
  }
}