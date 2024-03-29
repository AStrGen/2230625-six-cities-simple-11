import {useAppDispatch, useAppSelector} from "../../hooks";
import {AppRoute, AuthorizationStatus} from "../../const";
import {Link} from "react-router-dom";
import {logoutAction} from "../../store/api-actions";

export function HeaderNav() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const authorizationUser = useAppSelector((state) => state.authorizationUser);
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {authorizationStatus === AuthorizationStatus.Auth
            ? <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{authorizationUser?.email}</span>
            </div>
            : <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile" >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          }
        </li>
        {authorizationStatus === AuthorizationStatus.Auth &&
          <li className="header__nav-item" onClick={() => dispatch(logoutAction())}>
            <a className="header__nav-link" href="/#">
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        }
      </ul>
    </nav>
);
}
