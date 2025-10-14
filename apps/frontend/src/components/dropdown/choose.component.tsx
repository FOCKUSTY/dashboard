import { Dropdown } from "./index";

type DropdownProps = {
  id: string,
  summary: React.ReactNode
  className?: string,
  mainClassName?: string,
  summaryClassName?: string,
  elementClassName?: string,
}

export type Props = {
  components: React.ReactNode[],
  currentIndex: number;
  onChange: (current: number) => unknown,
  dropdown: DropdownProps
};

export const ChooseDropdownComponent = ({
  components,
  currentIndex,
  onChange,
  dropdown
}: Props) => (
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
            >{component}</button>
          )
      ))
    }
  </Dropdown>
);