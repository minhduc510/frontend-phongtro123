import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { MdKeyboardArrowDown } from '@/icons';
import { CategoryProps } from '@/interface';

interface IProps {
  selected: string;
  setSelected: (string: string) => void;
  data: CategoryProps[];
}

const InputOptionCategory = ({
  selected,
  setSelected,
  data,
}: IProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left   border sm:text-sm">
          <span className="block truncate">
            {selected
              ? selected.split('-')[1].trim()
              : '--- Chọn chuyên mục ---'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <MdKeyboardArrowDown />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Listbox.Option
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-4 w-full ${
                  active
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-gray-900'
                }`
              }
              value={''}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected
                        ? 'font-medium'
                        : 'font-normal'
                    }`}
                  >
                    --- Chọn chuyên mục ---
                  </span>
                </>
              )}
            </Listbox.Option>
            {data.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-4 w-full ${
                    active
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-gray-900'
                  }`
                }
                value={`${item.id} - ${item.title}`}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected
                          ? 'font-medium'
                          : 'font-normal'
                      }`}
                    >
                      {item.title}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default InputOptionCategory;
