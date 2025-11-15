import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/mockData';
import { useData } from '../context/DataContext';
import { StarRating } from '../components/StarRating';
import { Search, Clock } from 'lucide-react';

export function CourseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Courses
          </h1>
          <p className="text-gray-600">
            Explore {courses.length} courses with {reviews.length} student reviews
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by course number or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cmu-red focus:border-transparent"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cmu-red focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cmu-red focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">A-Z</option>
            </select>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Showing {sortedCourses.length} courses
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCourses.map((course) => {
            const stats = getCourseStats(course.id);

            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-cmu-red text-white px-3 py-1 rounded text-sm font-mono font-semibold">
                    {course.courseNumber}
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{course.department}</div>
                    <div className="text-xs text-gray-600">{course.units} units</div>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="border-t border-gray-100 pt-3">
                  {stats.reviewCount > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <StarRating rating={Math.round(stats.avgRating)} size={14} />
                        <span className="text-sm font-semibold text-gray-900">
                          {stats.avgRating}/5
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{stats.reviewCount} reviews</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{stats.avgWorkload} hrs/wk</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic text-center">No reviews yet</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {sortedCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <Search className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No courses found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
