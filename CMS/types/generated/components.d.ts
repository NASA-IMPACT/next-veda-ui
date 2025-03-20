import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    backgroundImg: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Subhead: Schema.Attribute.Text;
    Title: Schema.Attribute.Text;
  };
}

export interface SharedMdxBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_mdx_blocks';
  info: {
    displayName: 'mdxBlock';
  };
  attributes: {
    markdown: Schema.Attribute.Blocks;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSideBySide extends Struct.ComponentSchema {
  collectionName: 'components_shared_side_by_sides';
  info: {
    displayName: 'SideBySide';
  };
  attributes: {
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Orientation: Schema.Attribute.Enumeration<['Image Left', 'Image Right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Image Left'>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTest extends Struct.ComponentSchema {
  collectionName: 'components_shared_tests';
  info: {
    displayName: 'test';
  };
  attributes: {
    test: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.card': SharedCard;
      'shared.mdx-block': SharedMdxBlock;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.side-by-side': SharedSideBySide;
      'shared.slider': SharedSlider;
      'shared.test': SharedTest;
    }
  }
}
