import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';
import styles from './Dropdown.module.css';

export default function Dropdown({ options, onSelect, showDelete }) {
  return (
    <DropdownMenu.Root>
      {/* 트리거 버튼 */}
      <DropdownMenu.Trigger className={styles.trigger}>&times;</DropdownMenu.Trigger>

      {/* 드롭다운 메뉴 */}
      <DropdownMenu.Content className={styles.content} sideOffset={5}>
        {options.map((option, index) => {
          if (option.value === 'delete' && !showDelete) {
            return null;
          }
          return (
            <DropdownMenu.Item
              key={index}
              className={styles.item}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
