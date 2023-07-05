import ArtistWhite from 'assets/Images/ArtistWhite.png';
import ArtistColoured from 'assets/Images/Artist-1.png';
import ContentCreator from 'assets/Images/Content-Creator-1.png';
import ContentCreatorWhite from 'assets/Images/Content CreatorWhite.png';
import Storyteller from 'assets/Images/Storyteller-1.png';
import StorytellerWhite from 'assets/Images/StorytellerWhite.png';
import Flipper from 'assets/Images/Flipper-1.png';
import FlipperWhite from 'assets/Images/FlipperWhite.png';
import Esports from 'assets/Images/Esports-1.png';
import EsportsWhite from 'assets/Images/EsportsWhite.png';
import Entrepreneur from 'assets/Images/Entrepeneuer-1.png';
import EntrepreneurWhite from 'assets/Images/EntrepreneurWhite.png';
import Builder from 'assets/Images/Builder-1.png';
import BuilderWhite from 'assets/Images/BuilderWhite.png';

import ImLost from 'assets/Images/Im-lost-1.png';
import ImLostWhite from 'assets/Images/Im LostWhite.png';
import Translate from 'lib/Translate';

const RoleList = [{
    index: 1,
    icon: ArtistWhite,
    coloredIcon: ArtistColoured,
    label: Translate.t('Home.Artist'),
}, {
    index: 2,
    icon: ContentCreatorWhite,
    coloredIcon: ContentCreator,
    label: Translate.t('Home.ContentCreator'),
}, {
    index: 3,
    icon: StorytellerWhite,
    coloredIcon: Storyteller,
    label: Translate.t('Home.StoryTeller'),
}, {
    index: 4,
    icon: FlipperWhite,
    coloredIcon: Flipper,
    label: Translate.t('Home.Flipper'),
}, {
    index: 5,
    icon: EsportsWhite,
    coloredIcon: Esports,
    label: Translate.t('Home.Esports'),
}, {
    index: 6,
    icon: EntrepreneurWhite,
    coloredIcon: Entrepreneur,
    label: Translate.t('Home.Business'),
}, {
    index: 7,
    icon: BuilderWhite,
    coloredIcon: Builder,
    label: Translate.t('Home.Builder'),
}, {
    index: 8,
    icon: ImLostWhite,
    coloredIcon: ImLost,
    label: Translate.t('Home.ImLost'),
}];

export default RoleList;
