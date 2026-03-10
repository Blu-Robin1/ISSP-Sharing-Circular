import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BlockTypeSelect, BoldItalicUnderlineToggles, CreateLink, DiffSourceToggleWrapper, diffSourcePlugin, headingsPlugin, imagePlugin, ListsToggle, linkDialogPlugin, linkPlugin, listsPlugin, MDXEditor, markdownShortcutPlugin, quotePlugin, thematicBreakPlugin, toolbarPlugin, UndoRedo, } from '@mdxeditor/editor';
import { useMemo, useRef } from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { AddImage } from './AddImage';
import '@mdxeditor/editor/style.css';
import './style.css';
export const FieldMarkdown = (props) => {
    const ref = useRef(null);
    const { imageUploadHandler, input, meta, ...rest } = props;
    // Capture initial value once to use as key - this ensures editor remounts with new content
    // but stays mounted while typing
    const initialValueRef = useRef(input.value);
    const editorKey = useRef(initialValueRef.current ? 'has-content' : 'empty').current;
    const mainPluginList = useMemo(() => [
        headingsPlugin({ allowedHeadingLevels: [1, 2] }),
        listsPlugin(),
        quotePlugin(),
        imagePlugin({
            disableImageSettingsButton: true,
            disableImageResize: true,
        }),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        diffSourcePlugin({ readOnlyDiff: true }),
        markdownShortcutPlugin(),
    ], []);
    const toolbar = useMemo(() => toolbarPlugin({
        toolbarContents: () => (_jsxs(DiffSourceToggleWrapper, { children: [_jsx(UndoRedo, {}), _jsx(BoldItalicUnderlineToggles, {}), _jsx(ListsToggle, {}), _jsx(CreateLink, {}), _jsx(AddImage, { imageUploadHandler: imageUploadHandler }), _jsx(BlockTypeSelect, {})] })),
    }), [imageUploadHandler]);
    const showError = meta.error && meta.touched;
    return (_jsxs(Flex, { sx: { flexDirection: 'column', gap: 1 }, children: [showError && _jsx(Text, { sx: { fontSize: 1, color: 'error' }, children: meta.error }), _jsx(Box, { sx: {
                    alignSelf: 'stretch',
                    fontFamily: 'body',
                    lineHeight: 1.5,
                    a: {
                        textDecoration: 'underline',
                        '&:hover': { textDecoration: 'none' },
                    },
                    h3: { fontSize: 2 },
                    h4: { fontSize: 2 },
                    h5: { fontSize: 2 },
                    h6: { fontSize: 2 },
                    img: {
                        borderRadius: 2,
                        maxWidth: '100%',
                    },
                }, children: _jsx(MDXEditor, { ref: ref, className: showError ? 'mdxeditor-error' : '', markdown: input.value, plugins: [toolbar, ...mainPluginList], onBlur: () => input.onBlur(), onChange: (ev) => input.onChange(ev), ...rest }, editorKey) })] }));
};
