import { renderHook, act } from '@testing-library/react-hooks'

import useToggle from './use-toggle';

test('initializes in false', () => {
  const { result } = renderHook(() => useToggle(false));
  const [state] = result.current;
  expect(state).toBe(false);
});

test('initializes in true', () => {
  const { result } = renderHook(() => useToggle(true));
  const [state] = result.current;
  expect(state).toBe(true);
});

test('toggle is a function', () => {
  const { result } = renderHook(() => useToggle(true));
  const [_, toggle] = result.current;
  expect(typeof toggle).toBe('function');
});

test('toggles to true', () => {
  const { result } = renderHook(() => useToggle());
  let toggle = result.current[1];

  act(() => {
    toggle();
  });

  expect(result.current[0]).toBe(true);
});

test('toggles to false', () => {
  const { result } = renderHook(() => useToggle(true));
  let toggle = result.current[1];

  act(() => {
    toggle();
  });

  expect(result.current[0]).toBe(false);
});
