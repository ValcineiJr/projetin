import React, { useState, useCallback } from "react";
import { createEditor, Editor as Ed } from "slate";
import { Slate, withReact, useSlate } from "slate-react";
import Toolbar from "./components/Toolbar";

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignLeft,
  MdFormatAlignJustify,
} from "react-icons/md";

import { Button, E } from "./styles";

interface EditorProps {
  setDescription?: (e: any) => void;
  readonly?: boolean;
  initialValue?: any[];
}

const Editor = ({
  setDescription = () => {},
  readonly = true,
  initialValue = [
    {
      type: "paragraph",
      children: [
        {
          text: "Escreva a descrição do ",
        },
        {
          text: "produto",
          bold: true,
        },
        {
          text: ". ",
        },
      ],
    },
  ],
}: EditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const isMarkActive = (editor: any, format: string) => {
    const marks: any = Ed.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor: any, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Ed.removeMark(editor, format);
    } else {
      Ed.addMark(editor, format, true);
    }
  };

  const Leaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const Element = ({ attributes, children, element }: any) => {
    const style = { textAlign: element.align };
    switch (element.type) {
      case "block-quote":
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        );
      case "bulleted-list":
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        );
      case "heading-one":
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        );
      case "heading-two":
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        );
      case "list-item":
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        );
      case "numbered-list":
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        );
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        );
    }
  };

  const MarkButton = ({ format, Icon }: any) => {
    const editor = useSlate();
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon />
      </Button>
    );
  };

  const markers = [
    { format: "bold", Icon: MdFormatBold },
    { format: "italic", Icon: MdFormatItalic },
    { format: "underline", Icon: MdFormatUnderlined },
    { format: "code", Icon: MdCode },
    { format: "left", Icon: MdFormatAlignLeft },
    { format: "center", Icon: MdFormatAlignCenter },
    { format: "right", Icon: MdFormatAlignRight },
    { format: "justify", Icon: MdFormatAlignJustify },
  ];

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(e) => setDescription(e)}
    >
      {!readonly && (
        <Toolbar>
          {markers.map((item) => (
            <MarkButton
              key={item.format}
              format={item.format}
              Icon={item.Icon}
            />
          ))}
        </Toolbar>
      )}

      <E
        style={{
          backgroundColor: readonly ? "transparent" : "rgb(47, 47, 80)",
        }}
        renderElement={renderElement}
        readOnly={readonly}
        renderLeaf={renderLeaf}
        spellCheck
      />
    </Slate>
  );
};

export default Editor;
