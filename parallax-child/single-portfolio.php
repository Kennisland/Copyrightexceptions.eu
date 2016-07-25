<?php get_header(); ?>
<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/displayExceptions.js"></script>
<?php


/** Themify Default Variables
 *  @var object */
global $themify; ?>

<?php if( have_posts() ) while ( have_posts() ) : the_post(); ?>

<!-- layout-container -->
<div id="layout" class="pagewidth clearfix">

	<?php themify_content_before(); // hook ?>
	
	<!-- content -->
	<div id="content" class="list-post">
    	<?php themify_content_start(); // hook ?>
    	<?php get_template_part( 'includes/loop-portfolio', 'single'); ?>

		<?php wp_link_pages(array('before' => '<p class="post-pagination"><strong>' . __('Pages:', 'themify') . ' </strong>', 'after' => '</p>', 'next_or_number' => 'number')); ?>
		
		<?php get_template_part( 'includes/author-box', 'single'); ?>

	    <?php get_template_part( 'includes/post-nav', 'portfolio' ); ?>
		
<style type="text/css">.themify_builder .box-6370-1-0-1.module-box .module-box-content { background-color: #f3f3f3; color: #000; padding-right: 13%; padding-left: 13%;  } 
.themify_builder .box-6370-1-0-1.module-box { font-family: Lato; font-size: 18px; line-height: 27px; text-align: left; margin-top: 30px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px;  } 
.themify_builder .box-6370-1-0-1.module-box h1 { font-family: Lato; color: #000;  } 
.themify_builder .box-6370-1-0-1.module-box h2 { font-family: Lato; color: #000;  } 
.themify_builder .box-6370-1-0-1.module-box h3:not(.module-title) { font-family: Lato; color: #000;  } 
.themify_builder .box-6370-1-0-1.module-box h4 { font-family: Lato; color: #000;  } 
.themify_builder .box-6370-1-0-1.module-box h5 { font-family: Lato; color: #000;  } 
.themify_builder .box-6370-1-0-1.module-box h6 { font-family: Lato; color: #000;  } 
.themify_builder .box-6370-1-0-1.module-box a { color: #000; text-decoration: underline;  } 
.themify_builder .box-6370-1-0-1.module-box a:hover { color: #000;  } 
h3 {
	font-size: 28px;
	line-height: 40px;
}
</style>
		
		
		<div id="box-6370-1-0-1" class="module module-box box-6370-1-0-1 " style="margin-bottom: 0px;">        
			<div class="module-box-content ui   default  " style="padding-left:20%;padding-right:20%;background-color: #F3F3F3;margin-top : 30px;">
				<p style="text-align: left;">Select an exception&nbsp;below or scroll down to explore the complete list.</p><p style="text-align: left;"><a href="#Art51">Art. 5.1</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art52a">Art. 5.2(a)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art52b">Art. 5.2(b)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art52c">Art. 5.2(c)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art52d">Art. 5.2(d)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art52e">Art. 5.2(e)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53a">Art. 5.3(a)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53b">Art. 5.3(b)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53c">Art. 5.3(c)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53d">Art. 5.3(d)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53e">Art. 5.3(e)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53f">Art. 5.3(f)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53g">Art. 5.3(g)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53g">Art. 5.3(h)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53i">Art. 5.3(i)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53j">Art. 5.3(j)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53k">Art. 5.3(k)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53l">Art. 5.3(l)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53m">Art. 5.3(m)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53n">Art. 5.3(n)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#Art53o">Art. 5.3(o)</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#OrphanWorks">Orphan Works</a></p>
			</div>
        </div>
		
		<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
		<div id=exceptions class="module-box-content ui default" style="padding-left:20%;padding-right:20%; padding-top:80px; padding-bottom:80px; margin-bottom:80px; background-color: #F7F7F7;"></div>
		<script type="text/javascript">
		   Exceptions.init(['<?php echo get_post_meta($post->ID, "country", true); ?>']);
		   Exceptions.load();
		</script>
		
		<?php if(!themify_check('setting-comments_posts')): ?>
			<?php comments_template(); ?>
		<?php endif; ?>
		
        <?php themify_content_end(); // hook ?>
	</div>
	<!-- /content -->

    <?php themify_content_after(); // hook ?>

<?php endwhile; ?>

<?php 
/////////////////////////////////////////////
// Sidebar							
/////////////////////////////////////////////
if ($themify->layout != "sidebar-none"): get_sidebar(); endif; ?>

</div>
<!-- /layout-container -->
	
<?php get_footer(); ?>