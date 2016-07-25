<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<?php
/** Themify Default Variables
 *  @var object */
global $themify; ?>
<meta charset="<?php bloginfo( 'charset' ); ?>">

<!-- wp_header -->
<?php wp_head(); ?>
<script src="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.js"></script>
</head>

<body <?php body_class(); ?>>
<?php themify_body_start(); // hook ?>
<div id="pagewrap" class="hfeed site">

	<?php if( 'yes' != $themify->hide_header ) : ?>

		<div id="headerwrap" <?php $themify->theme->custom_header_background(); ?> >

			<?php themify_header_before(); // hook ?>
			<header id="header" class="pagewidth" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
				<?php themify_header_start(); // hook ?>
                                <div class="hgroup">
					<?php echo themify_logo_image('site_logo'); ?>

					<?php if ( $site_desc = get_bloginfo( 'description' ) ) : ?>
						<?php global $themify_customizer; ?>
						<div id="site-description" class="site-description"><?php echo class_exists( 'Themify_Customizer' ) ? $themify_customizer->site_description( $site_desc ) : $site_desc; ?></div>
					<?php endif; ?>

					<div class="social-widget">
						<?php dynamic_sidebar('social-widget'); ?>

						<?php if(!themify_check('setting-exclude_rss')): ?>
							<div class="rss">
								<a href="<?php if(themify_get('setting-custom_feed_url') != ""){ echo themify_get('setting-custom_feed_url'); } else { bloginfo('rss2_url'); } ?>"></a>
							</div>
						<?php endif; ?>
					</div>
					<!-- /.social-widget -->

					<?php if(!themify_check('setting-exclude_search_form')): ?>
						<?php get_search_form(); ?>
					<?php endif ?>

					<?php
						// If there's a header background slider, show it.
						global $themify_bg_gallery;
						$themify_bg_gallery->create_controller();
					?>
				</div>

				<div id="nav-bar" class="clearfix">
					<nav>
						<div id="menu-icon" class="mobile-button"><span><?php _e('Menu', 'themify'); ?></span></div>
						<div id="mobile-menu" class="sidemenu sidemenu-off" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
							<?php themify_theme_menu_nav(); ?>
							<!-- /#main-nav -->
							<a id="menu-icon-close" href="#"></a>
						</div>
						<!-- /#mobile-menu -->
					</nav>
				</div>

				<?php themify_header_end(); // hook ?>
			</header>
			<!-- /#header -->
			<?php themify_header_after(); // hook ?>

		</div>
		<!-- /#headerwrap -->

	<?php else : ?>

		<div id="nav-bar" class="clearfix">
			<nav>
				<div id="menu-icon" class="mobile-button"><span><?php _e('Menu', 'themify'); ?></span></div>
				<div id="mobile-menu" class="sidemenu sidemenu-off" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
					<?php themify_theme_menu_nav(); ?>
					<!-- /#main-nav -->
					<a id="menu-icon-close" href="#"></a>
				</div>
				<!-- /#mobile-menu -->
			</nav>
		</div>

	<?php endif; // hide_header check ?>

	<div id="body" class="clearfix">
    <?php themify_layout_before(); //hook ?>
