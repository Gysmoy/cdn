<?php

class HTML
{
    private string $tag;
    private array $attributes = [];
    private string $content = '';
    private bool $selfClosing = false;
    private array $selfClosingTags = ['input', 'img', 'br', 'hr', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track'];

    public function __construct(string $tag)
    {
        $this->tag = $tag;
    }

    public function attr(string $name, string $value): self
    {
        $this->attributes[$name] = $value;
        return $this;
    }

    public function html($html): self
    {
        $this->content = $html;
        return $this;
    }

    public function text($text): self
    {
        $this->content = htmlspecialchars($text);
        return $this;
    }

    public function id($id): self
    {
        $this->attributes['id'] = $id;
        return $this;
    }

    public function val($value): self
    {
        $this->attributes['value'] = $value;
        return $this;
    }

    public function src($src, $unique = false): self
    {
        $this->attributes['src'] = $src . ($unique ? '?v=' . uniqid() : '');
        return $this;
    }

    public function href($href, $unique = false): self
    {
        $this->attributes['href'] = $href . ($unique ? '?v=' . uniqid() : '');
        return $this;
    }

    public function selfClosing(bool $selfClosing = true): self
    {
        $this->selfClosing = $selfClosing;
        return $this;
    }

    public function render(): void
    {
        $attributes = [];
        foreach ($this->attributes as $name => $value) {
            $attributes[] = "{$name}=\"{$value}\"";
        }
        $attributes_str = implode(' ', $attributes);

        if ($this->selfClosing || in_array($this->tag, $this->selfClosingTags)) {
            echo "<{$this->tag} {$attributes_str} />";
        } else {
            echo "<{$this->tag} {$attributes_str}>{$this->content}</{$this->tag}>";
        }
    }

    public function __toString(): string
    {
        $attributes = [];
        foreach ($this->attributes as $name => $value) {
            $attributes[] = "{$name}=\"{$value}\"";
        }
        $attributes_str = implode(' ', $attributes);

        if ($this->selfClosing || in_array($this->tag, $this->selfClosingTags)) {
            return "<{$this->tag} {$attributes_str} />";
        } else {
            return "<{$this->tag} {$attributes_str}>{$this->content}</{$this->tag}>";
        }
    }
}
