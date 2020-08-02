## API Report File for "@remirror/preset-core"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AddCustomHandler } from '@remirror/core';
import { AnyCombinedUnion } from '@remirror/core';
import { DocExtension } from '@remirror/extension-doc';
import { DocOptions } from '@remirror/extension-doc';
import { EventsExtension } from '@remirror/extension-events';
import { GapCursorExtension } from '@remirror/extension-gap-cursor';
import { GetStaticAndDynamic } from '@remirror/core';
import { HistoryExtension } from '@remirror/extension-history';
import { HistoryOptions } from '@remirror/extension-history';
import { OnSetOptionsParameter } from '@remirror/core';
import { ParagraphExtension } from '@remirror/extension-paragraph';
import { PositionerExtension } from '@remirror/extension-positioner';
import { PositionerOptions } from '@remirror/extension-positioner';
import { Preset } from '@remirror/core';
import { RemirrorManager } from '@remirror/core';
import { Static } from '@remirror/core';
import { TextExtension } from '@remirror/extension-text';

// @public
export class CorePreset extends Preset<CorePresetOptions> {
    // (undocumented)
    createExtensions(): (HistoryExtension | GapCursorExtension | DocExtension | TextExtension | ParagraphExtension | PositionerExtension | EventsExtension)[];
    // (undocumented)
    get name(): "core";
    // (undocumented)
    protected onAddCustomHandler: AddCustomHandler<CorePresetOptions>;
    protected onSetOptions(_: OnSetOptionsParameter<CorePresetOptions>): void;
}

// @public
export interface CorePresetOptions extends DocOptions, PositionerOptions, HistoryOptions {
    excludeExtensions?: Static<Array<'doc' | 'paragraph' | 'text' | 'positioner' | 'history' | 'gapCursor' | 'events'>>;
}

// @public
export function createCoreManager<Combined extends AnyCombinedUnion>(combined: Combined[] | (() => Combined[]), options?: CreateCoreManagerOptions): RemirrorManager<import("@remirror/core").BuiltinPreset | CorePreset | Combined>;

// @public (undocumented)
export interface CreateCoreManagerOptions extends Remirror.ManagerSettings {
    core?: GetStaticAndDynamic<CorePresetOptions>;
}


// (No @packageDocumentation comment for this package)

```