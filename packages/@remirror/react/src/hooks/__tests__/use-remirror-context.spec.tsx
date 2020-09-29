import { act, renderHook } from '@testing-library/react-hooks';
import { RemirrorTestChain } from 'jest-remirror';
import React, { FC } from 'react';
import { BoldExtension } from 'remirror/extensions';

import { act as renderAct, strictRender } from '@remirror/testing/react';

import { createReactManager, Remirror, useManager, useRemirrorContext } from '../../..';

describe('useRemirrorContext', () => {
  it('returns the provider context', () => {
    const { wrapper } = createTestChain();
    const { result } = renderHook(() => useRemirrorContext({ autoUpdate: true }), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        nodes: expect.any(Object),
        marks: expect.any(Object),
        schema: expect.any(Object),
        tags: expect.any(Object),
        plugins: expect.any(Array),
        pluginKeys: expect.any(Object),
        getPluginState: expect.any(Function),
        getForcedUpdates: expect.any(Function),
        components: expect.any(Object),
        ssrTransformer: expect.any(Function),
        portalContainer: expect.any(Object),
        attributes: expect.any(Object),
        nodeViews: expect.any(Object),
        view: expect.any(Object),
        commands: expect.any(Object),
        chain: expect.any(Object),
        active: expect.any(Object),
        helpers: expect.any(Object),
        addHandler: expect.any(Function),
        uid: expect.any(String),
        getState: expect.any(Function),
        getPreviousState: expect.any(Function),
        getExtension: expect.any(Function),
        clearContent: expect.any(Function),
        setContent: expect.any(Function),
        focus: expect.any(Function),
        blur: expect.any(Function),
        getRootProps: expect.any(Function),
      }),
    );
    expect(result.current.getState()).toEqual(result.current.getPreviousState());
  });

  it('can listen to updates', () => {
    const { chain, wrapper } = createTestChain();
    const { doc, p } = chain.nodes;
    const { result } = renderHook(
      () => useRemirrorContext<BoldExtension>({ autoUpdate: true }),
      { wrapper },
    );
    expect(result.current.active.bold()).toBe(false);
    act(() => {
      chain.overwrite(doc(p('Welcome <start>friend<end>')));
    });
    expect(result.current.active.bold()).toBe(false);
    act(() => {
      result.current.commands.toggleBold();
    });
    expect(result.current.active.bold()).toBe(true);
  });

  it('can listen to updates with handler', () => {
    const { chain, wrapper } = createTestChain();
    const { doc, p } = chain.nodes;
    const mock = jest.fn();
    renderHook(() => useRemirrorContext<BoldExtension>(mock), { wrapper });
    act(() => {
      chain.overwrite(doc(p('Welcome <start>friend<end>')));
    });
    expect(mock).toHaveBeenCalledTimes(2);
  });

  it('should auto update when in strict mode', () => {
    const mock = jest.fn();
    const HookComponent: FC = () => {
      useRemirrorContext({ autoUpdate: true });
      mock();
      return <div />;
    };
    const chain = RemirrorTestChain.create(createReactManager([]));
    strictRender(
      <Remirror manager={chain.manager}>
        <HookComponent />
      </Remirror>,
    );

    for (const char of 'Strict') {
      renderAct(() => {
        chain.insertText(char);
      });
    }

    expect(mock).toHaveBeenCalledTimes(14);
  });
});

/**
 * A helper function for creating the editor setup when testing the editor
 * hooks.
 */
function createTestChain() {
  const chain = RemirrorTestChain.create(createReactManager(() => [new BoldExtension()]));

  const Wrapper: FC = ({ children }) => {
    return (
      <Remirror manager={chain.manager} autoRender>
        {children}
      </Remirror>
    );
  };

  return { chain, wrapper: Wrapper };
}
