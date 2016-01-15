$LOAD_PATH.push File.expand_path('../lib', __FILE__)

require 'pure_admin/rails/multiselect/version'

Gem::Specification.new do |s|
  s.name        = 'pure-admin-rails-multiselect'
  s.version     = PureAdmin::Rails::Multiselect::VERSION
  s.authors     = ['Tobyn Dockerill']
  s.email       = ['tobyn@mindvision.com.au']
  s.homepage    = ''
  s.summary     = 'A multiselect input using multiselect.js and quicksearch.js'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'pure-admin-rails'
  s.add_dependency 'rails'
  s.add_dependency 'jquery-rails'

  s.add_development_dependency 'sqlite3'
end
