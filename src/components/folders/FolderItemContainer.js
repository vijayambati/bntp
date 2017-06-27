import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TileFolderItem from '../kits/TileFolderItem';

import * as actionCreators from '../../state/folderItemEditor/actionCreators';

import FolderItemPreferences from '../../models/FolderItemPreferences';
import Bookmark from '../../models/Bookmark';
import ChromeApp from '../../models/ChromeApp';
import ChromePage from '../../models/ChromePage';

const FolderItemTypes = [
  PropTypes.instanceOf(Bookmark),
  PropTypes.instanceOf(ChromeApp),
  PropTypes.instanceOf(ChromePage),
];

class FolderItemContainer extends React.Component {
  static propTypes = {
    folderItemPreferences: PropTypes.instanceOf(FolderItemPreferences).isRequired,
    item: PropTypes.oneOfType(FolderItemTypes).isRequired,
  }

  render() {
    const { dispatch, item, folderItemPreferences } = this.props;
    const preference = folderItemPreferences.getById(item.id);
    return (
      <TileFolderItem
        url={item.url}
        icon={item.icon}
        badge={preference.accessKey}
        canEdit={true}
        onLinkClick={e => item.openIfSpecialLink()}
        onEditClick={e => dispatch(actionCreators.open(item, preference))}>
        {item.title}
      </TileFolderItem>
    );
  }
}

const mapStateToProps = state => ({
  folderItemPreferences: state.folderItemPreferences,
});

export default connect(mapStateToProps)(FolderItemContainer);
