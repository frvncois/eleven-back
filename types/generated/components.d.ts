import type { Schema, Struct } from '@strapi/strapi';

export interface AboutContactCta extends Struct.ComponentSchema {
  collectionName: 'components_about_contact_ctas';
  info: {
    displayName: 'Contact Cta';
    icon: 'envelop';
  };
  attributes: {
    aside: Schema.Attribute.String;
    cursor: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    line: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutGlobe extends Struct.ComponentSchema {
  collectionName: 'components_about_globes';
  info: {
    displayName: 'Globe';
    icon: 'earth';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    note: Schema.Attribute.Component<'shared.note', false> &
      Schema.Attribute.Required;
  };
}

export interface AboutRoom extends Struct.ComponentSchema {
  collectionName: 'components_about_rooms';
  info: {
    displayName: 'Room';
    icon: 'house';
  };
  attributes: {
    audio: Schema.Attribute.Media<'audios' | 'files'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    preset: Schema.Attribute.Enumeration<['studio', 'lobby', 'outside']> &
      Schema.Attribute.Required;
  };
}

export interface AboutService extends Struct.ComponentSchema {
  collectionName: 'components_about_services';
  info: {
    displayName: 'Service';
    icon: 'microphone';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.Text & Schema.Attribute.Required;
    sounds: Schema.Attribute.Component<'about.service-sound', true>;
  };
}

export interface AboutServiceSound extends Struct.ComponentSchema {
  collectionName: 'components_about_service_sounds';
  info: {
    displayName: 'Service sound';
    icon: 'music';
  };
  attributes: {
    files: Schema.Attribute.Media<'audios' | 'files', true> &
      Schema.Attribute.Required;
    word: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutStoryParagraph extends Struct.ComponentSchema {
  collectionName: 'components_about_story_paragraphs';
  info: {
    displayName: 'Story Paragraph';
    icon: 'paragraph';
  };
  attributes: {
    note: Schema.Attribute.Component<'shared.note', false> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AboutTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_team_members';
  info: {
    displayName: 'Team Member';
    icon: 'user';
  };
  attributes: {
    person: Schema.Attribute.Relation<'oneToOne', 'api::person.person'>;
    row: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ContactStudio extends Struct.ComponentSchema {
  collectionName: 'components_contact_studios';
  info: {
    displayName: 'Studio';
    icon: 'house';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    line1: Schema.Attribute.String & Schema.Attribute.Required;
    line2: Schema.Attribute.String & Schema.Attribute.Required;
    map: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface HomeGate extends Struct.ComponentSchema {
  collectionName: 'components_home_gates';
  info: {
    displayName: 'Gate';
    icon: 'lock';
  };
  attributes: {
    cursor: Schema.Attribute.String & Schema.Attribute.Required;
    hint: Schema.Attribute.String & Schema.Attribute.Required;
    line1: Schema.Attribute.String & Schema.Attribute.Required;
    line2: Schema.Attribute.String & Schema.Attribute.Required;
    skip: Schema.Attribute.String & Schema.Attribute.Required;
    tap: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LegalSection extends Struct.ComponentSchema {
  collectionName: 'components_legal_sections';
  info: {
    displayName: 'Section';
    icon: 'file';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.String;
    paragraphs: Schema.Attribute.Component<'shared.paragraph', true>;
    sectionId: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LongformFilm extends Struct.ComponentSchema {
  collectionName: 'components_longform_films';
  info: {
    displayName: 'Film';
    icon: 'film';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'aqua',
        'red',
        'pink',
        'purple',
        'yellow',
        'royal-blue',
        'bright-green',
        'dark-green',
        'light-grey',
        'ink',
        'bg',
        'neutral-0',
        'neutral-300',
        'neutral-1000',
      ]
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    objectPosition: Schema.Attribute.String;
    project: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
  };
}

export interface PartyItem extends Struct.ComponentSchema {
  collectionName: 'components_party_items';
  info: {
    displayName: 'Item';
    icon: 'picture';
  };
  attributes: {
    audio: Schema.Attribute.Media<'audios' | 'files'>;
    bg: Schema.Attribute.Enumeration<
      [
        'aqua',
        'red',
        'pink',
        'purple',
        'yellow',
        'royal-blue',
        'bright-green',
        'dark-green',
        'light-grey',
        'ink',
        'bg',
        'neutral-0',
        'neutral-300',
        'neutral-1000',
      ]
    > &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos' | 'files'>;
  };
}

export interface PeopleIcon extends Struct.ComponentSchema {
  collectionName: 'components_people_icons';
  info: {
    displayName: 'Icon';
    icon: 'emotionHappy';
  };
  attributes: {
    black: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    white: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface PeopleRole extends Struct.ComponentSchema {
  collectionName: 'components_people_roles';
  info: {
    displayName: 'Role';
    icon: 'briefcase';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PeopleTeamBar extends Struct.ComponentSchema {
  collectionName: 'components_people_team_bars';
  info: {
    displayName: 'Team Bar';
    icon: 'paint';
  };
  attributes: {
    bg: Schema.Attribute.Enumeration<
      [
        'aqua',
        'red',
        'pink',
        'purple',
        'yellow',
        'royal-blue',
        'bright-green',
        'dark-green',
        'light-grey',
        'ink',
        'bg',
        'neutral-0',
        'neutral-300',
        'neutral-1000',
      ]
    > &
      Schema.Attribute.Required;
    ink: Schema.Attribute.Enumeration<
      [
        'aqua',
        'red',
        'pink',
        'purple',
        'yellow',
        'royal-blue',
        'bright-green',
        'dark-green',
        'light-grey',
        'ink',
        'bg',
        'neutral-0',
        'neutral-300',
        'neutral-1000',
      ]
    > &
      Schema.Attribute.Required;
    roles: Schema.Attribute.Component<'people.role', true> &
      Schema.Attribute.Required;
  };
}

export interface SharedCredit extends Struct.ComponentSchema {
  collectionName: 'components_shared_credits';
  info: {
    displayName: 'Credit';
    icon: 'user';
  };
  attributes: {
    href: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'bulletList';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'aqua',
        'red',
        'pink',
        'purple',
        'yellow',
        'royal-blue',
        'bright-green',
        'dark-green',
        'light-grey',
        'ink',
        'bg',
        'neutral-0',
        'neutral-300',
        'neutral-1000',
      ]
    > &
      Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    key: Schema.Attribute.Enumeration<
      ['mixers', 'archive', 'longform', 'about', 'contact']
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    match: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNote extends Struct.ComponentSchema {
  collectionName: 'components_shared_notes';
  info: {
    displayName: 'Margin note';
    icon: 'message';
  };
  attributes: {
    n: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    photoAlt: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraphs';
  info: {
    displayName: 'Paragraph';
    icon: 'paragraph';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedPersonContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_person_contacts';
  info: {
    displayName: 'Person Contact';
    icon: 'phone';
  };
  attributes: {
    email: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'search';
  };
  attributes: {
    defaultTitle: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<'images'>;
    ogImageAlt: Schema.Attribute.String;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    themeColor: Schema.Attribute.String & Schema.Attribute.Required;
    titleTemplate: Schema.Attribute.String & Schema.Attribute.Required;
    twitterImage: Schema.Attribute.Media<'images'>;
    twitterImageAlt: Schema.Attribute.String;
  };
}

export interface SharedSizedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_sized_images';
  info: {
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    platform: Schema.Attribute.Enumeration<['linkedin', 'instagram']> &
      Schema.Attribute.Required;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_videos';
  info: {
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    poster: Schema.Attribute.Media<'images'>;
    src: Schema.Attribute.Media<'videos' | 'files'> & Schema.Attribute.Required;
  };
}

export interface SiteFooter extends Struct.ComponentSchema {
  collectionName: 'components_site_footers';
  info: {
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    credits: Schema.Attribute.Component<'shared.credit', true>;
    creditsLabel: Schema.Attribute.String & Schema.Attribute.Required;
    legal: Schema.Attribute.Component<'shared.link', true>;
    social: Schema.Attribute.Component<'shared.social-link', true>;
  };
}

export interface SitePlayerLabels extends Struct.ComponentSchema {
  collectionName: 'components_site_player_labelss';
  info: {
    displayName: 'Player Labels';
    icon: 'play';
  };
  attributes: {
    close: Schema.Attribute.String & Schema.Attribute.Required;
    pause: Schema.Attribute.String & Schema.Attribute.Required;
    play: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiCredits extends Struct.ComponentSchema {
  collectionName: 'components_ui_creditss';
  info: {
    displayName: 'Credits';
    icon: 'bulletList';
  };
  attributes: {
    mixerTbc: Schema.Attribute.String & Schema.Attribute.Required;
    roleAgency: Schema.Attribute.String & Schema.Attribute.Required;
    roleDirector: Schema.Attribute.String & Schema.Attribute.Required;
    roleMix: Schema.Attribute.String & Schema.Attribute.Required;
    roleMixSound: Schema.Attribute.String & Schema.Attribute.Required;
    roleProduction: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiCursors extends Struct.ComponentSchema {
  collectionName: 'components_ui_cursorss';
  info: {
    displayName: 'Cursors';
    icon: 'cursor';
  };
  attributes: {
    clickMe: Schema.Attribute.String & Schema.Attribute.Required;
    close: Schema.Attribute.String & Schema.Attribute.Required;
    listen: Schema.Attribute.String & Schema.Attribute.Required;
    play: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiDock extends Struct.ComponentSchema {
  collectionName: 'components_ui_docks';
  info: {
    displayName: 'Dock';
    icon: 'apps';
  };
  attributes: {
    close: Schema.Attribute.String & Schema.Attribute.Required;
    menu: Schema.Attribute.String & Schema.Attribute.Required;
    off: Schema.Attribute.String & Schema.Attribute.Required;
    on: Schema.Attribute.String & Schema.Attribute.Required;
    sound: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiErrorPage extends Struct.ComponentSchema {
  collectionName: 'components_ui_error_pages';
  info: {
    displayName: 'Error Page';
    icon: 'exclamationMarkCircle';
  };
  attributes: {
    body: Schema.Attribute.String & Schema.Attribute.Required;
    cta: Schema.Attribute.String & Schema.Attribute.Required;
    retry: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiGateLabels extends Struct.ComponentSchema {
  collectionName: 'components_ui_gate_labelss';
  info: {
    displayName: 'Gate Labels';
    icon: 'lock';
  };
  attributes: {
    muteAria: Schema.Attribute.String & Schema.Attribute.Required;
    offLabel: Schema.Attribute.String & Schema.Attribute.Required;
    onAria: Schema.Attribute.String & Schema.Attribute.Required;
    onLabel: Schema.Attribute.String & Schema.Attribute.Required;
    skipAria: Schema.Attribute.String & Schema.Attribute.Required;
    soundAria: Schema.Attribute.String & Schema.Attribute.Required;
    soundLabel: Schema.Attribute.String & Schema.Attribute.Required;
    wordmarkAlt: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiNotFound extends Struct.ComponentSchema {
  collectionName: 'components_ui_not_founds';
  info: {
    displayName: 'Not Found';
    icon: 'question';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiPlayer extends Struct.ComponentSchema {
  collectionName: 'components_ui_players';
  info: {
    displayName: 'Player';
    icon: 'play';
  };
  attributes: {
    nextFilm: Schema.Attribute.String & Schema.Attribute.Required;
    pause: Schema.Attribute.String & Schema.Attribute.Required;
    play: Schema.Attribute.String & Schema.Attribute.Required;
    seek: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiRegions extends Struct.ComponentSchema {
  collectionName: 'components_ui_regionss';
  info: {
    displayName: 'Regions';
    icon: 'landscape';
  };
  attributes: {
    archiveDrag: Schema.Attribute.String & Schema.Attribute.Required;
    closeMenu: Schema.Attribute.String & Schema.Attribute.Required;
    easterEgg: Schema.Attribute.String & Schema.Attribute.Required;
    films: Schema.Attribute.String & Schema.Attribute.Required;
    homeAria: Schema.Attribute.String & Schema.Attribute.Required;
    homeGateAria: Schema.Attribute.String & Schema.Attribute.Required;
    main: Schema.Attribute.String & Schema.Attribute.Required;
    mixers: Schema.Attribute.String & Schema.Attribute.Required;
    projects: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiViews extends Struct.ComponentSchema {
  collectionName: 'components_ui_viewss';
  info: {
    displayName: 'Views';
    icon: 'grid';
  };
  attributes: {
    grid: Schema.Attribute.String & Schema.Attribute.Required;
    list: Schema.Attribute.String & Schema.Attribute.Required;
    showAsTemplate: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WorkArchiveTile extends Struct.ComponentSchema {
  collectionName: 'components_work_archive_tiles';
  info: {
    displayName: 'Archive Tile';
    icon: 'grid';
  };
  attributes: {
    clientLabel: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about.contact-cta': AboutContactCta;
      'about.globe': AboutGlobe;
      'about.room': AboutRoom;
      'about.service': AboutService;
      'about.service-sound': AboutServiceSound;
      'about.story-paragraph': AboutStoryParagraph;
      'about.team-member': AboutTeamMember;
      'contact.studio': ContactStudio;
      'home.gate': HomeGate;
      'legal.section': LegalSection;
      'longform.film': LongformFilm;
      'party.item': PartyItem;
      'people.icon': PeopleIcon;
      'people.role': PeopleRole;
      'people.team-bar': PeopleTeamBar;
      'shared.credit': SharedCredit;
      'shared.link': SharedLink;
      'shared.nav-item': SharedNavItem;
      'shared.note': SharedNote;
      'shared.paragraph': SharedParagraph;
      'shared.person-contact': SharedPersonContact;
      'shared.seo': SharedSeo;
      'shared.sized-image': SharedSizedImage;
      'shared.social-link': SharedSocialLink;
      'shared.video': SharedVideo;
      'site.footer': SiteFooter;
      'site.player-labels': SitePlayerLabels;
      'ui.credits': UiCredits;
      'ui.cursors': UiCursors;
      'ui.dock': UiDock;
      'ui.error-page': UiErrorPage;
      'ui.gate-labels': UiGateLabels;
      'ui.not-found': UiNotFound;
      'ui.player': UiPlayer;
      'ui.regions': UiRegions;
      'ui.views': UiViews;
      'work.archive-tile': WorkArchiveTile;
    }
  }
}
