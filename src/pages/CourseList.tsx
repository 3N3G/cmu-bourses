import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/mockData';
import { useData } from '../context/DataContext';
import { StarRating } from '../components/StarRating';
import { Search, Clock, Filter, Grid, List, TrendingUp, Award } from 'lucide-react';

export function CourseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { reviews } = useData();

  const departments = [...new Set(courses.map(c => c.department))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.courseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'all' || course.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const getCourseStats = (courseId: string) => {
    const courseReviews = reviews.filter(r => r.courseId === courseId);
    if (courseReviews.length === 0) {
      return { avgRating: 0, reviewCount: 0, avgWorkload: 0, avgDifficulty: 0, avgUsefulness: 0 };
    }
    const avgRating =
      courseReviews.reduce((sum, r) => sum + r.overallRating, 0) / courseReviews.length;
    const avgWorkload =
      courseReviews.reduce((sum, r) => sum + r.workloadHours, 0) / courseReviews.length;
    const avgDifficulty =
      courseReviews.reduce((sum, r) => sum + r.difficultyRating, 0) / courseReviews.length;
    const avgUsefulness =
      courseReviews.reduce((sum, r) => sum + r.usefulnessRating, 0) / courseReviews.length;
    return {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: courseReviews.length,
      avgWorkload: Math.round(avgWorkload),
      avgDifficulty: Math.round(avgDifficulty * 10) / 10,
      avgUsefulness: Math.round(avgUsefulness * 10) / 10
    };
  };

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const statsA = getCourseStats(a.id);
    const statsB = getCourseStats(b.id);

    if (sortBy === 'rating') {
      return statsB.avgRating - statsA.avgRating;
    } else if (sortBy === 'reviews') {
      return statsB.reviewCount - statsA.reviewCount;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Browse Courses
          </h1>
          <p className="text-lg text-gray-600">
            Explore {courses.length} courses with {reviews.length} student reviews
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-slide-up">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by course number or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cmu-red focus:border-cmu-red transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cmu-red focus:border-cmu-red transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cmu-red focus:border-cmu-red transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{sortedCourses.length}</span> courses
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-cmu-red text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-cmu-red text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedCourses.map((course, index) => {
            const stats = getCourseStats(course.id);

            if (viewMode === 'list') {
              return (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-x-1 flex items-center gap-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-cmu-red to-cmu-red-dark text-white px-4 py-3 rounded-xl font-mono font-bold text-center min-w-[100px]">
                      <div className="text-sm opacity-80">Course</div>
                      <div className="text-lg">{course.courseNumber}</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-medium">{course.department}</span>
                      <span>•</span>
                      <span>{course.units} units</span>
                      <span>•</span>
                      <span className="capitalize">{course.level}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {stats.reviewCount > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <StarRating rating={Math.round(stats.avgRating)} size={16} />
                          <span className="text-lg font-bold text-cmu-red">
                            {stats.avgRating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">{stats.reviewCount} reviews</div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock size={12} />
                          <span>{stats.avgWorkload} hrs/wk</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No reviews</p>
                    )}
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border-t-4 border-cmu-red animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white px-4 py-2 rounded-lg font-mono font-bold text-sm shadow-md">
                    {course.courseNumber}
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{course.department}</div>
                    <div className="text-sm font-semibold text-gray-700">{course.units} units</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cmu-red transition-colors line-clamp-2 min-h-[3.5rem]">
                  {course.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed min-h-[4rem]">
                  {course.description}
                </p>

                <div className="border-t-2 border-gray-100 pt-4">
                  {stats.reviewCount > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <StarRating rating={Math.round(stats.avgRating)} size={18} />
                        <span className="text-lg font-bold text-cmu-red">
                          {stats.avgRating}<span className="text-sm text-gray-500">/5</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-blue-50 rounded-lg p-2 text-center">
                          <div className="font-bold text-blue-700">{stats.reviewCount}</div>
                          <div className="text-blue-600">Reviews</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-2 text-center">
                          <div className="font-bold text-orange-700">{stats.avgDifficulty}/5</div>
                          <div className="text-orange-600">Difficulty</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-2 text-center">
                          <div className="font-bold text-green-700">{stats.avgWorkload}h</div>
                          <div className="text-green-600">Per Week</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Award className="mx-auto text-gray-300 mb-2" size={24} />
                      <p className="text-sm text-gray-400 italic">No reviews yet</p>
                      <p className="text-xs text-gray-400 mt-1">Be the first to review!</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {sortedCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <Search className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
