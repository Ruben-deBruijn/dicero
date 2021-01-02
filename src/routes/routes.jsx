import React from 'react';

// Core
import * as Paths from './paths';
import * as Pages from '../pages';

/**
 * Routes
 */
export const ROUTES = [
  {
    key: Paths.OVERVIEW_PATH,
    path: Paths.OVERVIEW_PATH,
    render: props => <Pages.OverviewPage {...props} />,
  },
  {
    key: Paths.ADMIN_PATH,
    path: Paths.ADMIN_PATH,
    render: props => <Pages.AdminPage {...props} />,
  },
  {
    key: Paths.CLIENT_LIST_PATH,
    path: Paths.CLIENT_LIST_PATH,
    render: props => <Pages.ClientListPage {...props} />,
  },
  {
    key: Paths.DOSSIER_LIST_PATH,
    path: Paths.DOSSIER_LIST_PATH,
    render: props => <Pages.DossierListPage {...props} />,
  },
  {
    key: Paths.CREATE_DOSSIER_PATH,
    path: Paths.CREATE_DOSSIER_PATH,
    render: props => <Pages.CreateDossierPage {...props} />,
  },
];