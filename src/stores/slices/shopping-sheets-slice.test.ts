import { beforeEach, describe, expect, it } from 'vitest';

import { useBoundStore } from '@/stores/use-bound-store';

describe('duplicateSheet', () => {
  beforeEach(() => {
    useBoundStore.setState({ sheets: [] });
  });

  it('copies sheet contents independently while clearing share and item checked states', () => {
    const source = {
      id: 'source-sheet',
      name: '今週の買い物',
      shareId: 'shared-sheet-id',
      categories: [{ id: 'produce', name: '野菜' }],
      items: [
        { id: 'carrot', name: 'にんじん', categoryId: 'produce', checked: true },
        { id: 'milk', name: '牛乳', categoryId: null, checked: false },
      ],
    };
    useBoundStore.setState({ sheets: [source] });

    useBoundStore.getState().duplicateSheet(source.id);

    const duplicate = useBoundStore.getState().sheets[1];
    expect(duplicate).toEqual({
      id: expect.any(String),
      name: source.name,
      shareId: null,
      categories: source.categories,
      items: [
        { ...source.items[0], checked: false },
        { ...source.items[1], checked: false },
      ],
    });
    expect(duplicate.id).not.toBe(source.id);
    expect(duplicate.categories).not.toBe(source.categories);
    expect(duplicate.categories[0]).not.toBe(source.categories[0]);
    expect(duplicate.items).not.toBe(source.items);
    expect(duplicate.items[0]).not.toBe(source.items[0]);
  });

  it('does not change state when the source sheet does not exist', () => {
    useBoundStore.getState().duplicateSheet('missing-sheet');

    expect(useBoundStore.getState().sheets).toEqual([]);
  });
});
